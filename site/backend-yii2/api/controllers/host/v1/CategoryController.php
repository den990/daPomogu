<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use common\models\Category;
use common\models\User;
use Yii;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\web\Controller;

class CategoryController extends AppController
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
                'show'  => ['get'],
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

    public function actionShow() {
        $categories = Category::find()->asArray()->all();

        $categoriesMap = ArrayHelper::map($categories, 'id', 'name');
        return ApiResponse::success($categoriesMap);
    }
}