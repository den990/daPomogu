<?php

namespace common\models;

use DateTime;
use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property resource $id Первичный ключ, uuid
 * @property string $email Email
 * @property string $phone Телефон
 * @property string|null $surname Фамилия
 * @property string $name Имя
 * @property string $patronymic Отчество
 * @property string $date_of_birthday Дата рождения
 * @property string $address Дата рождения
 * @property string $password_hash Sha256 хэш пароля
 * @property integer $is_admin Админ 1/0
 * @property integer $is_blocked Заблокирован 1/0
 * @property integer $avatar_id УИ file 1/0
 *
 * @property File $avatar
 * @property Organization|null $organizationOwner
 * @property Organization[]|null $organizations
 * @property TaskUser[]|null $taskUsers
 * @property Task[]|null $tasksViaTaskUser
 * @property string $avatarUrl
 */
class User extends ActiveRecord implements IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'password_hash', 'phone'], 'required'],
            [['name', 'surname', 'patronymic'], 'string', 'min' => 2, 'max' => 100],
            [['email'], 'string', 'max' => 150],
            [['phone'], 'string', 'max' => 18],
            [['date_of_birthday'], 'date', 'format' => 'php:Y-m-d'],
            [['address'], 'string', 'max' => 255],
            [['password_hash'], 'string'],
            [['is_admin', 'is_blocked'], 'boolean'],
            [['avatar_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['email'], 'unique'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'surname' => Yii::t('app', 'Surname'),
            'patronymic' => Yii::t('app', 'Patronymic'),
            'name' => Yii::t('app', 'Name'),
            'phone' => Yii::t('app', 'Phone'),
            'email' => Yii::t('app', 'Email'),
            'password_hash' => Yii::t('app', 'Password Hash'),
            'date_of_birthday' => Yii::t('app', 'Date of Birthday'),
            'address' => Yii::t('app', 'Address'),
            'is_admin' => Yii::t('app', 'Is Admin'),
            'is_blocked' => Yii::t('app', 'Is Blocked'),
            'avatar_id' => Yii::t('app', 'Avatar ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }



    public function getAvatar()
    {
        return $this->hasOne(File::class, ['id' => 'avatar_id']);
    }

    public function isValid()
    {
        foreach (['name', 'email'] as $attr) {
            if (empty($this->$attr)) {
                return false;
            }
        }
        return true;
    }

    public function getOrganizationOwner()
    {
        return $this->hasOne(Organization::class, ['id' => 'organization_id'])
            ->viaTable('user_organization', ['user_id' => 'id'], function ($query) {
                $query->andWhere(['is_owner' => 1]);
            });
    }

    public function getOrganizations()
    {
        return $this->hasMany(Organization::class, ['id' => 'organization_id'])
            ->viaTable('user_organization', ['user_id' => 'id'], function ($query) {
                $query->andWhere(['is_accepted' => 1, 'is_owner' => 0]);
            });
    }


    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        // TODO: Implement getAuthKey() method.
    }

    public function validateAuthKey($authKey)
    {
        // TODO: Implement validateAuthKey() method.
    }

    /**
     * Связь с моделями TaskUser (записи, связывающие пользователя с задачами).
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTaskUsers()
    {
        return $this->hasMany(TaskUser::class, ['user_id' => 'id']);
    }

    /**
     * Получение задач, через таблицу task_user.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTasksViaTaskUser()
    {
        return $this->hasMany(Task::class, ['id' => 'task_id'])->via('taskUsers');
    }


    public function getAvatarUrl() {
        if ($this->avatar_id && $this->avatar) {
            return Yii::getAlias('@api') . '/web/' . $this->avatar->src;
        }
        return Yii::getAlias('@api') . '\web\images\no-avatar.jpg';
    }
}
