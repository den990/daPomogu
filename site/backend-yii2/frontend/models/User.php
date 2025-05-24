<?php


namespace frontend\models;


use Yii;
use yii\web\IdentityInterface;

/**
 * Class User
 * @package backend\models\
 *
 * Этот класс наследуется от модели таблицы, в которой хранятся пользователи
 * приложения frontend
 *
 * Раскомментировать код в функции \backend\models\User::findIdentity
 * Раскомментировать код в функции \backend\models\User::getId
 * Раскомментировать код в функции \backend\models\User::getAuthKey
 * Раскомментировать код в функции \backend\models\User::initials
 */
class User /*extends common\models\User*/ implements IdentityInterface
{
    public function initials()
    {
//        return $this->surname
//            . ' '
//            . mb_substr($this->name, 0, 1)
//            . ($this->patronymic ? ('. '
//                . mb_substr($this->patronymic, 0, 1)
//                . '.') : '.');
    }

    public static function findIdentity($id)
    {
//        return static::findOne(['id' => $id]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return null;
    }

    public function getId()
    {
//        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
//        return hash(
//            'sha256',
//            $this->id
//            . $this->password
//            . Yii::$app->request->cookieValidationKey
//            . Yii::$app->request->userIP
//            . Yii::$app->request->userAgent
//        );
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
}