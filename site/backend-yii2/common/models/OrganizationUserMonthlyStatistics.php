<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "organization_user_monthly_statistics".
 *
 * @property int $id
 * @property int $organization_id
 * @property int $user_id
 * @property int $year
 * @property int $month
 * @property int $score
 * @property int $tasks_count
 * @property int|null $rank
 * @property string $created_at
 *
 * @property Organization $organization
 * @property User $user
 */
class OrganizationUserMonthlyStatistics extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'organization_user_monthly_statistics';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['organization_id', 'user_id', 'year', 'month'], 'required'],
            [['organization_id', 'user_id', 'year', 'month', 'score', 'tasks_count', 'rank'], 'integer'],
            [['created_at'], 'safe'],
            [['organization_id', 'user_id', 'year', 'month'], 'unique', 'targetAttribute' => ['organization_id', 'user_id', 'year', 'month']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'organization_id' => 'Organization ID',
            'user_id' => 'User ID',
            'year' => 'Year',
            'month' => 'Month',
            'score' => 'Score',
            'tasks_count' => 'Tasks Count',
            'rank' => 'Rank',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets related organization.
     */
    public function getOrganization()
    {
        return $this->hasOne(Organization::class, ['id' => 'organization_id']);
    }

    /**
     * Gets related user.
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
}
