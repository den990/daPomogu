<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_monthly_statistics".
 *
 * @property int $id
 * @property int $user_id
 * @property int $year
 * @property int $month
 * @property int $score
 * @property int $tasks_count
 * @property int|null $rank
 * @property string $created_at
 *
 * @property User $user
 */
class UserMonthlyStatistics extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_monthly_statistics';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'year', 'month'], 'required'],
            [['user_id', 'year', 'month', 'score', 'tasks_count', 'rank'], 'integer'],
            [['created_at'], 'safe'],
            [['user_id', 'year', 'month'], 'unique', 'targetAttribute' => ['user_id', 'year', 'month']],
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
            'year' => 'Year',
            'month' => 'Month',
            'score' => 'Score',
            'tasks_count' => 'Tasks Count',
            'rank' => 'Rank',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets related user.
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
}
