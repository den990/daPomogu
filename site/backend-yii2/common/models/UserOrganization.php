<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_organization".
 *
 * @property int $id
 * @property int $user_id
 * @property int $organization_id
 * @property int $is_owner
 * @property int $is_accepted
 *
 * @property User $user
 * @property Organization $organization
 */
class UserOrganization extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_organization';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'organization_id'], 'required'],
            [['user_id', 'organization_id'], 'integer'],
            [['is_owner', 'is_accepted'], 'boolean'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'organization_id' => 'Organization ID',
            'is_owner' => 'Is Owner',
            'is_accepted' => 'Is Accepted',
        ];
    }

    /**
     * Gets related User.
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * Gets related Organization.
     */
    public function getOrganization()
    {
        return $this->hasOne(Organization::class, ['id' => 'organization_id']);
    }
}
