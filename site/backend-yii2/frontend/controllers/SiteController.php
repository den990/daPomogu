<?php

namespace frontend\controllers;

use common\components\AlertNotice;
use common\models\File;
use frontend\models\forms\S3FileUploadForm;
use frontend\models\forms\StorageFileUploadForm;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Controller;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'except' => ['error'],
                'rules' => [
                    [
                        'actions' => ['index', 'file-upload', 's3-file-upload', 'file-delete'],
                        'allow' => true,
                        'roles' => ['?', '@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'file-upload' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
                'layout' => 'blank'
            ],
        ];
    }

    public function actionIndex()
    {
        $storageFileUploadForm = new StorageFileUploadForm();
        $s3FileUploadForm = new S3FileUploadForm();

        return $this->render('index', [
            'storageFileUploadForm' => $storageFileUploadForm,
            's3FileUploadForm' => $s3FileUploadForm,
            'localFiles' => File::find()->where(['storage' => File::LOCAL_STORAGE])->all(),
            's3Files' => File::find()->where(['storage' => File::S3_STORAGE])->all(),
        ]);
    }

    public function actionFileUpload()
    {
        $fileUploadForm = new StorageFileUploadForm();

        if($fileUploadForm->upload() !== null)
            AlertNotice::addSuccess();
        else
            AlertNotice::addError();

        return $this->redirect(['index']);
    }

    public function actionS3FileUpload()
    {
        $fileUploadForm = new S3FileUploadForm();

        if($fileUploadForm->load($this->request->post()) and $fileUploadForm->upload() !== null)
            AlertNotice::addSuccess();
        else
            AlertNotice::addError();

        return $this->redirect(['index']);
    }

    public function actionFileDelete($id)
    {
        $file = File::findOne(['id' => $id]);

        if($file and $file->delete())
            AlertNotice::addSuccess();
        else AlertNotice::addError();

        return $this->redirect($this->request->referrer);
    }
}
