<?php

namespace api\models\forms;

use common\models\File;
use common\models\User;
use Yii;
use yii\helpers\ArrayHelper;
use yii\web\UploadedFile;

class UserForm extends User
{
    public $password;
    public $avatar;
    public function rules()
    {
        return ArrayHelper::merge(parent::rules(), [
            [['password'], 'required'],
            [['avatar'], 'file', 'skipOnEmpty' => true, 'extensions' => ['png', 'jpg', 'jpeg', 'webp', 'heic'], 'maxSize' => 1024 * 1024 * 5],
        ]);
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();

        $scenarios['update'] = [
            'name',
            'surname',
            'patronymic',
            'date_of_birthday',
            'address',
            'email',
            'phone',
            'avatar',
        ];

        return $scenarios;
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($this->scenario === 'update') {
            $transaction = Yii::$app->db->beginTransaction();

            try {
                $this->avatar = \yii\web\UploadedFile::getInstanceByName('avatar');

                if ($this->avatar) {
                    if ($this->avatar_id) {
                        $oldFile = \common\models\File::findOne($this->avatar_id);
                        if ($oldFile) {
                            $oldFilePath = Yii::getAlias('@webroot/' . $oldFile->src);
                            if (file_exists($oldFilePath)) {
                                unlink($oldFilePath);
                            }
                            $oldFile->delete();
                        }
                    }

                    $uploadDir = Yii::getAlias('@webroot/uploads/');
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0775, true);
                    }

                    $fileName = uniqid() . '.' . $this->avatar->extension;
                    $filePath = $uploadDir . $fileName;

                    if (!$this->avatar->saveAs($filePath)) {
                        throw new \Exception('Не удалось сохранить файл');
                    }

                    $fileModel = new \common\models\File();
                    $fileModel->src = 'uploads/' . $fileName;
                    $fileModel->uploaded_at = date('Y-m-d H:i:s');

                    if (!$fileModel->save()) {
                        throw new \Exception('Не удалось сохранить модель File: ' . json_encode($fileModel->getErrors()));
                    }

                    $this->avatar_id = $fileModel->id;
                }

                if (!parent::save($runValidation, $attributeNames)) {
                    throw new \Exception('Ошибка сохранения пользователя: ' . json_encode($this->getErrors()));
                }

                $transaction->commit();
                return true;

            } catch (\Throwable $e) {
                $transaction->rollBack();
                Yii::error([
                    'name' => $this->avatar->name,
                    'tempName' => $this->avatar->tempName,
                    'type' => $this->avatar->type,
                    'extension' => $this->avatar->extension,
                    'hasError' => $this->avatar->size,
                ],__METHOD__);
                Yii::error($e->getMessage(), __METHOD__);
                return false;
            }
        }

        if ($this->isNewRecord && !Yii::$app->emailService->sendRegistrationVolunteerEmail($this))
            return false;

        return parent::save($runValidation, $attributeNames);
    }

    public function formName()
    {
        return '';
    }

}