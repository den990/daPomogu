<?php

namespace api\models\forms;

use common\models\Organization;
use Yii;
use yii\helpers\ArrayHelper;

class OrganizationForm extends Organization
{
    public $avatar;
    public function rules()
    {
        $rules = parent::rules();

        foreach ($rules as $k => $rule) {
            if (in_array('email', (array)$rule[0]) && in_array('unique', $rule)) {
                unset($rules[$k]);
            }
            if (in_array('inn', (array)$rule[0]) && in_array('unique', $rule)) {
                unset($rules[$k]);
            }
        }

        return ArrayHelper::merge($rules, [
            [['avatar'], 'file', 'skipOnEmpty' => true, 'extensions' => ['png', 'jpg', 'jpeg', 'webp'], 'maxSize' => 1024 * 1024 * 5],
            ['email', 'unique', 'targetClass' => Organization::class, 'filter' => function ($query) {
                if ($this->id) {
                    $query->andWhere(['not', ['id' => $this->id]]);
                }
            }],
            ['inn', 'unique', 'targetClass' => Organization::class, 'filter' => function ($query) {
                if ($this->id) {
                    $query->andWhere(['not', ['id' => $this->id]]);
                }
            }],
        ]);
    }


    public function formName()
    {
        return '';
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();

        $scenarios['update'] = [
            'name',
            'email',
            'phone',
            'inn',
            'legal_address',
            'actual_address',
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
                Yii::error($e->getMessage(), __METHOD__);
                return false;
            }
        }

        if ($this->isNewRecord && !Yii::$app->emailService->sendRegistrationOrganizationEmail($this))
            return false;


        return parent::save($runValidation, $attributeNames);
    }
}