<?php


namespace api\controllers\host\v1;


use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

class AppController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Allow-Credentials' => null,
                'Access-Control-Expose-Headers' => ['Authorization'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            ],
        ];

        return $behaviors;
    }

    public function beforeAction($action)
    {
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

        return true;
    }

    private function auth()
    {
        $header = Yii::$app->request->getHeaders()->get('Authorization');

        if (!$header || !preg_match('/^Bearer\s+(.*?)$/', $header, $matches)) {
            return false;
        }

        $jwt = Yii::$app->jwt;
        $tokenString = $matches[1];

        $token = $jwt->loadToken($tokenString);

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