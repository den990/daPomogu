<?php


namespace api\controllers\host\v1;


use api\components\ApiResponse;
use api\models\forms\LoginForm;
use api\models\forms\OrganizationForm;
use api\models\forms\UserForm;
use api\models\host\v1\SiteIndex;
use common\models\OrganizationStatus;
use common\models\User;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\web\Controller;
use Yii;

class SiteController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'index'  => ['post'],
                'signup'  => ['post'],
                'signup-organization'  => ['post'],
            ],
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        $model = new SiteIndex();

        if($model->load($this->request->post()) and $model->execute())
            return ApiResponse::success($model->result);

        return ApiResponse::error(null, null, $model->errors);
    }

    public function actionSignup()
    {
        $model = new UserForm();
        if ($model->load($this->request->post())) {
            $model->password_hash = Yii::$app->security->generatePasswordHash($model->password);

            if ($model->save()) {
                return ApiResponse::success();
            }

            return ApiResponse::error(404, null, $model->errors);
        }

        return ApiResponse::error(404, null, $model->errors);
    }

    public function actionSignupOrganization()
    {
        $model = new OrganizationForm();
        if ($model->load($this->request->post())) {
            $model->status_id = OrganizationStatus::STATUS_PENDING;
            $user = User::findOne(['email' => $model->email]);
            if ($user)
                return ApiResponse::error(404, null, "Пользователь с таким email существует");

            if ($model->save()) {
                return ApiResponse::success();
            }

            return ApiResponse::error(404, null, $model->errors);
        }

        return ApiResponse::error(404, null, $model->errors);
    }

    public function actionLogin()
    {
        $model = new LoginForm();

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            $user = $model->getValidUser();

            if (!$user) {
                return $this->asJson([
                    'success' => false,
                    'message' => Yii::t('app', 'User not found.'),
                ]);
            }

            /** @var \sizeg\jwt\Jwt $jwt */
            $jwt = Yii::$app->jwt;
            $signer = $jwt->getSigner('HS256');
            $key = $jwt->getKey();
            $time = time();

            $token = $jwt->getBuilder()
                ->issuedAt($time)
                ->expiresAt($time + 3600 * 24)
                ->withClaim('user_id', $user->id)
                ->withClaim('role',  $user->is_admin
                    ? 'admin'
                    : ($user->organizationOwner !== null
                        ? 'organization'
                        : 'volunteer'))
                ->getToken($signer, $key);

            return $this->asJson([
                'success' => true,
                'token' => (string) $token,
            ]);
        }

        return $this->asJson([
            'success' => false,
            'message' => Yii::t('app', 'Invalid email or password.'),
            'errors' => $model->getErrors(),
        ]);
    }

}