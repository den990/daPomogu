<?php


namespace frontend\controllers;


use common\models\File;
use Yii;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class FileController extends Controller
{
    public function actionGet($id, $key)
    {
        $model = File::findOne(['id' => $id]);

        if(!$model or $model->key !== $key)
            throw new NotFoundHttpException('File is not found');

        return \Yii::$app->response->sendFile(
            $model->bucket,
            $model->baseName(),
            [
                'inline' => true
            ]
        );
    }
}