<?php

namespace api\models\forms;

use common\models\User;
use Yii;
use yii\base\Model;

class ChangePasswordForm extends Model
{
    public $userId;
    public $old_password;
    public $password;

    private $_user;

    public function rules()
    {
        return [
            [['password', 'old_password'], 'string', 'min' => 6],
            [['password', 'old_password'], 'required'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'email' => Yii::t('app', 'Email'),
            'password' => Yii::t('app', 'Password'),
            'old_password' => Yii::t('app', 'Old password'),
        ];
    }

    public function getUser()
    {
        if (!$this->_user) {
            $this->_user = User::findOne(['id' => $this->userId]);
        }

        return $this->_user;
    }

    public function formName()
    {
        return '';
    }

    public function changePassword() {
        $user = $this->getUser();
        if (!$user)
            return false;

        if (!Yii::$app->security->validatePassword($this->old_password, $user->password_hash))
            return false;

        $user->password_hash = Yii::$app->security->generatePasswordHash($this->password);
        if (!$user->save(false, ['password_hash'])) {
            return false;
        }

        return true;
    }
}