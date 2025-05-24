<?php

namespace api\models\forms;

use common\models\User;
use Yii;
use yii\base\Model;

class LoginForm extends Model
{

    public $email;
    public $password;
    private $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['email', 'password'], 'required'],
            ['email', 'email'],
            ['password', 'validatePassword'],
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getValidUser();

            if (!$user || !Yii::$app->security->validatePassword($this->password, $user->password_hash)) {
                $this->addError($attribute, Yii::t('app', 'Incorrect email or password'));
            }
        }
    }

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    public function getValidUser()
    {
        if ($this->_user === false) {
            $this->_user = User::findOne(['email' => $this->email, 'is_blocked' => 0]);
        }

        return $this->_user;
    }

    public function attributeLabels()
    {
        return [
            'email' => Yii::t('app', 'Email'),
            'password' => Yii::t('app', 'Password')
        ];
    }

    public function formName()
    {
        return '';
    }
}
