<?php


namespace api\controllers\host\v1;


use api\components\ApiResponse;
use api\models\forms\OrganizationForm;
use common\models\Organization;
use common\models\OrganizationStatus;
use common\models\Task;
use common\models\TaskStatus;
use common\models\User;
use common\models\UserOrganization;
use Yii;
use yii\data\Pagination;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\helpers\FileHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\web\UnauthorizedHttpException;

class OrganizationController extends Controller
{
    const COUNT_ORGANIZATION_INP_PAGE = 6;
    const ACTIONS_WITH_LOGIN = ['my-profile', 'get-my-avatar', 'get-requests-to-apply', 'accept-attachment', 'reject-attachment', 'get-my-volunteers', 'update', 'detach-user'];
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'profile' => ['GET', 'OPTIONS'],
                'my-profile' => ['GET', 'OPTIONS'],
                'get-organizations-accepted-list' => ['GET', 'OPTIONS'],
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action)
    {
        if (in_array($action->id, self::ACTIONS_WITH_LOGIN)) {

            if (Yii::$app->request->isOptions) {
                $this->setCorsHeaders();
                Yii::$app->response->statusCode = 200;
                Yii::$app->response->content = '';
                Yii::$app->response->send();
                return false;
            }

            if (!parent::beforeAction($action)) {
                return false;
            }

            if (!$this->auth()) {
                throw new UnauthorizedHttpException('Invalid or expired JWT token');
            }

            if (!isset(Yii::$app->params['user.id']))
                throw new UnauthorizedHttpException('Доступ запрещён.');

            $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
            if (!$user) {
                throw new UnauthorizedHttpException('Доступ запрещён.');
            }

            return true;
        }
        else {
            if (!parent::beforeAction($action)) {
                return false;
            }

            return true;
        }
    }

    public function actionProfile($id)
    {
        if ($this->auth()) {
            if (Yii::$app->params['user.role'] == 'volunteer') {
                $userOrganization = UserOrganization::findOne(['user_id' => Yii::$app->params['user.id'], 'organization_id' => $id]);
                $organization = Organization::findOne(['id' => $id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);
            }
            if (Yii::$app->params['user.role'] == 'admin') {
                $organization = Organization::findOne(['id' => $id]);
                $userOrganization = null;
            }
        } else {
            $userOrganization = null;
            $organization = Organization::findOne(['id' => $id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);
        }

        if (!$organization) {
            throw new NotFoundHttpException('Организация не найдена.');
        }

        return ApiResponse::success([
            'id' => $organization->id,
            'email' => $organization->email,
            'phone' => $organization->phone,
            'inn' => $organization->inn,
            'name' => $organization->name,
            'actual_address' => $organization->actual_address,
            'legal_address' => $organization->legal_address,
            'full_name_owner' => $organization->full_name_owner,
            'tasks' => $organization->getTasksInProfile(),
            'count_finished_tasks' => Task::find()->where(['organization_id' => $organization->id, 'status_id' => TaskStatus::STATUS_COMPLETE])->count(),
            'count_volunteers' => UserOrganization::find()->where(['organization_id' => $organization->id])->count(),
            'count_days' => $organization->getDaysSinceRegistration(),
            'is_attached' => $userOrganization && $userOrganization->is_accepted,
            'is_requested' => $userOrganization && $userOrganization->is_accepted == 0,
        ]);
    }

    public function actionMyProfile()
    {
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne(['id' => $user->organizationOwner->id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);

        if (!$organization) {
            throw new NotFoundHttpException('Организация не найдена.');
        }

        return ApiResponse::success([
            'id' => $organization->id,
            'email' => $organization->email,
            'phone' => $organization->phone,
            'inn' => $organization->inn,
            'name' => $organization->name,
            'actual_address' => $organization->actual_address,
            'legal_address' => $organization->legal_address,
            'full_name_owner' => $organization->full_name_owner,
            'tasks' => $organization->getTasksInProfile(),
            'count_finished_tasks' => Task::find()->where(['organization_id' => $organization->id, 'status_id' => TaskStatus::STATUS_COMPLETE])->count(),
            'count_volunteers' => UserOrganization::find()->where(['organization_id' => $organization->id])->count(),
            'count_days' => $organization->getDaysSinceRegistration(),
            'is_attached' => false,
            'is_requested' => false,
        ]);
    }

    public function actionUpdate()
    {
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        if ($user->organizationOwner) {
            ApiResponse::error(400, null, Yii::t('app', 'Organization not found'));
        }

        $organization = OrganizationForm::findOne(['id' => $user->organizationOwner->id]);
        $organization->setScenario('update');

        if ($organization->load(Yii::$app->request->getBodyParams())) {
            if ($organization->save(false)) {
                return ApiResponse::success();
            }

            return ApiResponse::error(500, 'Save Error', $organization->getFirstErrors(), 500);
        }

        return ApiResponse::error(422, 'Validation Error', $organization->errors, 422);
    }

    public function actionGetAvatar($id)
    {
        $organization = Organization::findOne(['id' => $id]);
        if (!$organization) {
            throw new NotFoundHttpException('Organization not found');
        }

        $filePath = $organization->avatarUrl;

        if (!file_exists($filePath)) {
            throw new NotFoundHttpException('Avatar file not found');
        }

        return Yii::$app->response->sendFile($filePath, null, [
            'mimeType' => FileHelper::getMimeType($filePath),
            'inline' => true,
        ]);
    }

    public function actionGetMyAvatar()
    {
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne(['id' => $user->organizationOwner->id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);

        if (!$organization) {
            throw new NotFoundHttpException('Organization not found');
        }

        $filePath = $organization->avatarUrl;

        if (!file_exists($filePath)) {
            throw new NotFoundHttpException('Avatar file not found');
        }

        return Yii::$app->response->sendFile($filePath, null, [
            'mimeType' => FileHelper::getMimeType($filePath),
            'inline' => true,
        ]);
    }


    public function actionGetOrganizationsAcceptedList($page = 1)
    {
        $query = Organization::find()->where(['status_id' => OrganizationStatus::STATUS_ACCEPTED]);
        $pageSize = self::COUNT_ORGANIZATION_INP_PAGE;

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => $pageSize,
            'page' => $page - 1,
        ]);

        $organizations = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

        $response = [];

        foreach ($organizations as $org) {
            $imageData = file_get_contents($org->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

            $response[] = [
                'id' => (string)$org->id,
                'name' => $org->name,
                'created_at' => date('Y-m-d', strtotime($org->created_at)),
                'avatar' => $avatarBase64,
            ];
        }

        return ApiResponse::success([
            'data' => $response,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionGetRequestsToApply()
    {
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne(['id' => $user->organizationOwner->id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);
        $requests = UserOrganization::find()
            ->where([
                'organization_id' => $organization->id,
                'is_owner' => 0,
                'is_accepted' => 0
            ])
            ->all();

        $userIds = ArrayHelper::getColumn($requests, 'user_id');

        if (empty($userIds)) {
            return ApiResponse::success();
        }

        $users = User::find()->where(['id' => $userIds])->all();
        $result = [];

        foreach ($users as $u) {
            $imageData = file_get_contents($u->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

            $result[] = [
                'id' => $u->id,
                'email' => $u->email,
                'phone' => $u->phone,
                'name' => $u->name,
                'surname' => $u->surname,
                'address' => $u->address,
                'avatar_base64' => $avatarBase64,
            ];
        }

        return ApiResponse::success($result);
    }

    public function actionAcceptAttachment($user_id)
    {
        $userOwner = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$userOwner) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne(['id' => $userOwner->organizationOwner->id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);
        $request = UserOrganization::findOne([
                'organization_id' => $organization->id,
                'user_id' => $user_id,
                'is_accepted' => 0
        ]);

        if (!$request) {
            throw new NotFoundHttpException('Request not found');
        }

        $request->is_accepted = 1;
        if (!$request->save(false, ['is_accepted']))
            return ApiResponse::error(422, null, $request->errors);

        Yii::$app->emailService->sendOrganizationAttachmentAccepted(User::findOne(['id' => $user_id]), $organization);
        return ApiResponse::success();
    }

    public function actionRejectAttachment($user_id)
    {
        $userOwner = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$userOwner) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne(['id' => $userOwner->organizationOwner->id, 'status_id' => OrganizationStatus::STATUS_ACCEPTED]);
        $request = UserOrganization::findOne([
            'organization_id' => $organization->id,
            'user_id' => $user_id,
            'is_accepted' => 0
        ]);

        if (!$request) {
            throw new NotFoundHttpException('Request not found');
        }

        if (!$request->delete())
            return ApiResponse::error(422, null, $request->errors);

        Yii::$app->emailService->sendOrganizationAttachmentAccepted(User::findOne(['id' => $user_id]), $organization);

        return ApiResponse::success();
    }

    public function actionGetMyVolunteers($page = null)
    {
        $userOwner = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$userOwner) {
            throw new NotFoundHttpException('User not found');
        }

        $organization = Organization::findOne([
            'id' => $userOwner->organizationOwner->id,
            'status_id' => OrganizationStatus::STATUS_ACCEPTED
        ]);

        if (!$organization) {
            throw new NotFoundHttpException('Organization not found');
        }

        $query = UserOrganization::find()
            ->where([
                'organization_id' => $organization->id,
                'is_accepted' => 1,
                'is_owner' => 0,
            ]);

        if ($page) {
            $pagination = new Pagination([
                'totalCount' => $query->count(),
                'pageSize' => self::COUNT_ORGANIZATION_INP_PAGE,
                'page' => $page - 1,
            ]);

            $requests = $query
                ->offset($pagination->offset)
                ->limit($pagination->limit)
                ->all();
        } else {
            $requests = $query ->all();
        }

        $userIds = ArrayHelper::getColumn($requests, 'user_id');

        if (empty($userIds)) {
            return ApiResponse::success([
                'data' => [],
                'total_pages' => $pagination->getPageCount(),
                'current_page' => $pagination->getPage() + 1,
            ]);
        }

        $users = User::find()->where(['id' => $userIds])->all();
        $result = [];

        foreach ($users as $u) {
            $imageData = file_get_contents($u->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

            $result[] = [
                'id' => $u->id,
                'email' => $u->email,
                'phone' => $u->phone,
                'name' => $u->name,
                'surname' => $u->surname,
                'address' => $u->address,
                'avatar_base64' => $avatarBase64,
            ];
        }
        if ($page) {
            return ApiResponse::success([
                'data' => $result,
                'total_pages' => $pagination->getPageCount(),
                'current_page' => $pagination->getPage() + 1,
            ]);
        } else {
            return ApiResponse::success($result
            );
        }
    }

    public function actionDetachUser($id)
    {
        $userOwner = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$userOwner) {
            throw new NotFoundHttpException('User not found');
        }

        $model = UserOrganization::findOne(['user_id' => $id, 'organization_id' => $userOwner->organizationOwner->id]);
        if (!$model->delete())
            return ApiResponse::error(422, null, $model->errors);

        return ApiResponse::success();
    }


    private function auth()
    {
        $header = Yii::$app->request->getHeaders()->get('Authorization');

        if (!$header || !preg_match('/^Bearer\s+(.*?)$/', $header, $matches)) {
            return false;
        }

        $jwt = Yii::$app->jwt;
        $tokenString = $matches[1];

        try {
            $token = $jwt->loadToken($tokenString);
        } catch (\Throwable $e) {
            Yii::warning('JWT parsing failed: ' . $e->getMessage(), __METHOD__);
            return false;
        }

        if (!$token) {
            return false;
        }

        $userId = $token->getClaim('user_id');
        $role = $token->getClaim('role');

        Yii::$app->params['user.id'] = $userId;
        Yii::$app->params['user.role'] = $role;

        return true;
    }


    protected function setCorsHeaders()
    {
        $headers = Yii::$app->response->getHeaders();
        $headers->set('Access-Control-Allow-Origin', '*');
        $headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $headers->set('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
        $headers->set('Access-Control-Allow-Credentials', 'true');
        $headers->set('Access-Control-Expose-Headers', 'Authorization');
    }

}