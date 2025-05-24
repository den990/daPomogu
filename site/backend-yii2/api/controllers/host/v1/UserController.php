<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use api\models\forms\UserForm;
use common\models\Organization;
use common\models\User;
use api\models\forms\ChangePasswordForm;
use common\models\UserOrganization;
use Yii;
use yii\filters\VerbFilter;
use yii\helpers\FileHelper;
use yii\helpers\Json;
use yii\web\NotFoundHttpException;

class UserController extends AppController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'profile-info' => ['GET', 'OPTIONS'],
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }

        if (!isset(Yii::$app->params['user.id']))
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');

        $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
        if (!$user) {
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');
        }

        return true;
    }

    public function actionProfileInfo($id = null) {
        if ($id === null) {
            $id = Yii::$app->params['user.id'];
        }

        $user = User::findOne(['id' => $id]);
        if (!$user || $user->organizationOwner) {
            throw new \yii\web\BadRequestHttpException('User not found');
        }
        return ApiResponse::success([
            'id' => $user->id,
            'name' => $user->name,
            'surname' => $user->surname,
            'patronymic' => $user->patronymic,
            'date_of_birthday' => $user->date_of_birthday,
            'address' => $user->address,
            'email' => $user->email,
            'phone' => $user->phone,
            'count_tasks' => count($user->taskUsers),
        ]);
    }

    public function actionGetAvatar($id = null)
    {
        if ($id === null) {
            $id = Yii::$app->params['user.id'];
        }

        $user = User::findOne($id);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        $filePath = $user->avatarUrl;

        if (!file_exists($filePath)) {
            throw new NotFoundHttpException('Avatar file not found');
        }

        return Yii::$app->response->sendFile($filePath, null, [
            'mimeType' => FileHelper::getMimeType($filePath),
            'inline' => true,
        ]);
    }

    public function actionChangePassword() {
        $model = new ChangePasswordForm(['userId' => Yii::$app->params['user.id']]);

        if ($model->load($this->request->post()) && $model->changePassword()) {
            return ApiResponse::success();
        }

        return ApiResponse::error(404, null, $model->errors);
    }

    public function actionUpdate($id = null)
    {
        if ($id !== null && Yii::$app->params['user.role'] !== 'admin') {
            return ApiResponse::error(403, 'Forbidden', 'Access denied', 403);
        }

        $userId = $id ?? Yii::$app->params['user.id'];

        /** @var UserForm|null $user */
        $user = UserForm::findOne($userId);
        if (!$user) {
            return ApiResponse::error(404, 'Not Found', 'User not found', 404);
        }

        $user->setScenario('update');

        if ($user->load(Yii::$app->request->getBodyParams())) {
            if ($user->save(false)) {
                return ApiResponse::success();
            }

            return ApiResponse::error(500, 'Save Error', $user->getFirstErrors(), 500);
        }

        return ApiResponse::error(422, 'Validation Error', $user->getFirstErrors(), 422);
    }

    public function actionAttachOrganization($id) {
        $organization = $this->findOrganization($id);
        $userOrganization = new UserOrganization();
        $userOrganization->user_id = Yii::$app->params['user.id'];
        $userOrganization->organization_id = $organization->id;

        if (!$userOrganization->save())
            return ApiResponse::error(422, null, $userOrganization->errors);

        return ApiResponse::success();
    }

    public function actionDettachOrganization($id) {
        $organization = $this->findOrganization($id);
        $userOrganization = UserOrganization::findOne(['user_id' => Yii::$app->params['user.id'], 'organization_id' => $organization->id]);

        if (!$userOrganization)
            return ApiResponse::error(422, null, Yii::t('app', 'Not found attachment'));

        if (!$userOrganization->delete())
            return ApiResponse::error(422, null, $userOrganization->errors);

        return ApiResponse::success();
    }

    public function actionOrganizations()
    {
        $userId = Yii::$app->params['user.id'];
        $user = User::findOne(['id' => $userId]);
        $res = [];
        foreach ($user->organizations as $organization) {
            $res[] = [
                'id' => $organization->id,
                'name' => $organization->name,
            ];
        }

        return ApiResponse::success($res);
    }

    protected function findOrganization($id)
    {
        if($model = Organization::findOne(['id' =>$id])) {
            return $model;
        }
        throw new NotFoundHttpException('Model not found');
    }
}