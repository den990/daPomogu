<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use common\models\Organization;
use common\models\OrganizationStatus;
use common\models\Task;
use common\models\User;
use common\models\UserOrganization;
use Yii;
use yii\data\Pagination;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;

class AdminController extends AppController
{
    const COUNT_RECORDS_LIST = 5;
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'get-pending-organization-requests' => ['GET', 'OPTIONS'],
                'statistic' => ['GET', 'OPTIONS'],
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }

        if (Yii::$app->params['user.role'] !== 'admin') {
            throw new \yii\web\ForbiddenHttpException('Access denied');
        }

        if (!isset(Yii::$app->params['user.id']))
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');

        $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
        if (!$user) {
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');
        }

        return true;
    }

    public function actionApplyRegisterOrganization($id)
    {
        $transaction = Yii::$app->db->beginTransaction();

        try {
            $organization = Organization::findOne(['id' => $id]);
            if (!$organization) {
                return ApiResponse::error(404, null, Yii::t('app', 'Organization not found'));
            }

            $organization->status_id = OrganizationStatus::STATUS_ACCEPTED;
            if (!$organization->save()) {
                return ApiResponse::error(422, null, Yii::t('app', 'Ошибка при сохранении организации'));
            }

            $user = new User();
            $user->email = $organization->email;
            $user->phone = $organization->phone;
            $user->name = $organization->name;
            $password = Yii::$app->security->generateRandomString(10);
            $user->password_hash = Yii::$app->security->generatePasswordHash($password);

            if (!$user->save() || !Yii::$app->emailService->sendOrganizationRegistationAccepted($organization, $password)) {
                return ApiResponse::error(422, null, $user->errors);
            }

            $userOrganization = new UserOrganization();
            $userOrganization->user_id = $user->id;
            $userOrganization->organization_id = $organization->id;
            $userOrganization->is_owner = 1;

            if (!$userOrganization->save()) {
                return ApiResponse::error(422, null, Yii::t('app', 'Ошибка при создании связи'));
            }

            $transaction->commit();
            return ApiResponse::success();

        } catch (\Throwable $e) {
            $transaction->rollBack();
            return ApiResponse::error(500, null, $e->getMessage());
        }
    }

    public function actionRejectRegisterOrganization($id)
    {
        $organization = Organization::findOne(['id' => $id]);
        if (!$organization) {
            return ApiResponse::error(404, null, Yii::t('app', 'Organization not found'));
        }

        $organization->status_id = OrganizationStatus::STATUS_REJECTED;
        if (!$organization->save()) {
            return ApiResponse::error(422, $organization->errors, Yii::t('app', 'Ошибка при сохранении организации'));
        }

        Yii::$app->emailService->sendOrganizationRegistationRejected($organization);

        return ApiResponse::success();
    }

    public function actionGetPendingOrganizationRequests()
    {
        $organizations = Organization::find()
            ->where(['status_id' => OrganizationStatus::STATUS_PENDING])
            ->all();

        $data = [];

        foreach ($organizations as $org) {
            $data[] = [
                'id' => (string)$org->id,
                'email' => $org->email,
                'phone' => $org->phone,
                'name' => $org->name,
                'INN' => $org->inn,
                'actual_address' => $org->actual_address,
                'legal_address' => $org->legal_address,
                'full_name_owner' => $org->full_name_owner,
            ];
        }

        return ApiResponse::success($data);
    }

    public function actionStatistic() {
        $countUsers = (int) User::find()->count();
        $countBlockedUsers = (int) User::find()->where(['is_blocked' => 1])->count();
        $countFinishedTasks = (int) Task::find()->where(['status_id' => 1])->count();
        $countActiveTasks = (int) Task::find()->where(['<>', 'status_id', 1])->count();

        return ApiResponse::success([
            'count_user' => $countUsers,
            'count_active_tasks' => $countActiveTasks,
            'count_blocked_users' => $countBlockedUsers,
            'count_finished_tasks' => $countFinishedTasks,
        ]);
    }

    public function actionGetOrganizationUserList($page = 1)
    {
        $query = User::find();

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $users = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

        $result = [];

        foreach ($users as $user) {
            $orgOwnred = $user->organizationOwner;

            if ($orgOwnred) {
                $imageData = file_get_contents($orgOwnred->avatarUrl);
                $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

                $result[] = [
                    'type' => 'organization',
                    'id' => (string)$user->id,
                    'email' => $orgOwnred->email,
                    'name' => $orgOwnred->name,
                    'is_blocked' => $orgOwnred->is_blocked,
                    'avatar_base64' => $avatarBase64,
                ];
            } else {
                $imageData = file_get_contents($user->avatarUrl);
                $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

                $result[] = [
                    'type' => 'user',
                    'id' => (string)$user->id,
                    'email' => $user->email,
                    'surname' => $user->surname,
                    'is_admin' => $user->is_admin,
                    'name' => $user->name,
                    'is_blocked' => $user->is_blocked,
                    'avatar_base64' => $avatarBase64,
                ];
            }
        }

        return ApiResponse::success([
            'data' => $result,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionBlockUser($id) {
        $user = $this->findUser($id);
        if ($user->is_admin)
            return ApiResponse::error(400, null, Yii::t('app', 'User is admin'));
        $user->is_blocked = 1;
        if (!$user->save(false, ['is_blocked']))
            return ApiResponse::error(422, null, $user->errors);

        if ($user->organizationOwner) {
            $user->organizationOwner->is_blocked = 1;
            if (!$user->organizationOwner->save(false, ['is_blocked']))
                return ApiResponse::error(422, null, $user->organizationOwner->errors);
        }

        return ApiResponse::success();
    }

    public function actionUnblockUser($id) {
        $user = $this->findUser($id);
        $user->is_blocked = 0;
        if (!$user->save(false, ['is_blocked']))
            return ApiResponse::error(422, null, $user->errors);

        if ($user->organizationOwner) {
            $user->organizationOwner->is_blocked = 0;
            if (!$user->organizationOwner->save(false, ['is_blocked']))
                return ApiResponse::error(422, null, $user->organizationOwner->errors);
        }

        return ApiResponse::success();
    }

    protected function findUser($id)
    {
        if($model = User::findOne(['id' =>$id])) {
            return $model;
        }
        throw new NotFoundHttpException('Model not found');
    }
}