<?php

namespace api\models\forms;

use common\models\ApproveFile;
use common\models\ApproveTask;
use common\models\File;
use Exception;
use Yii;
use yii\web\UploadedFile;

class ApproveTaskForm extends ApproveTask
{
    public function formName()
    {
        return ''; // TODO: Change the autogenerated stub
    }

    /** @var UploadedFile */
    public $image;

    public function rules()
    {
        return array_merge(parent::rules(), [
            [['task_id', 'user_id'], 'required'],
            [['image'], 'file', 'skipOnEmpty' => false, 'extensions' => ['png', 'jpg', 'jpeg', 'gif', 'webp'], 'maxSize' => 5 * 1024 * 1024],
        ]);
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        $transaction = Yii::$app->db->beginTransaction();

        try {
            $this->image = UploadedFile::getInstanceByName('image');

            if ($runValidation && !$this->validate($attributeNames)) {

                throw new \Exception('Ошибка валидации: ' . json_encode($this->getErrors()));
            }

            $fileModel = null;

            if ($this->image) {
                $uploadDir = Yii::getAlias('@webroot/uploads/');
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0775, true);
                }

                $fileName = uniqid() . '.' . $this->image->extension;
                $filePath = $uploadDir . $fileName;

                if (!$this->image->saveAs($filePath)) {
                    throw new \Exception('Не удалось сохранить файл');
                }

                $fileModel = new File();
                $fileModel->src = 'uploads/' . $fileName;
                $fileModel->uploaded_at = date('Y-m-d H:i:s');

                if (!$fileModel->save()) {
                    throw new \Exception('Не удалось сохранить модель File: ' . json_encode($fileModel->getErrors()));
                }
            }

            if (!parent::save(false, $attributeNames)) {
                throw new \Exception('Ошибка сохранения ApproveTask: ' . json_encode($this->getErrors()));
            }

            if ($fileModel) {
                $approveFile = new ApproveFile();
                $approveFile->user_id = $this->user_id;
                $approveFile->file_id = $fileModel->id;
                $approveFile->approve_task_id = $this->id;

                if (!$approveFile->save()) {
                    throw new \Exception('Не удалось сохранить ApproveFile: ' . json_encode($approveFile->getErrors()));
                }
            }

            $transaction->commit();
            return true;

        } catch (\Throwable $e) {
            $transaction->rollBack();
            Yii::error($e->getMessage(), __METHOD__);
            $this->addError('image', $e->getMessage());
            return false;
        }
    }

}