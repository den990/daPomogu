<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "{{%task}}".
 *
 * @property int $id
 * @property int $organization_id
 * @property string $name
 * @property int $type_id
 * @property string $description
 * @property string $location
 * @property string $task_date
 * @property int|null $participants_count
 * @property int|null $max_score
 * @property int $status_id
 * @property string $created_at
 * @property string $updated_at
 * @property integer $is_deleted Удалено 1/0
 *
 * @property Organization $organization
 * @property TaskType $type
 * @property TaskStatus $status
 * @property TaskUser[]|null $taskUsers
 * @property User[]|null $usersViaTaskUser
 * @property User[]|null $coordinators
 * @property User[]|null $participants
 * @property TaskCategory[] $taskCategories
 * @property Category[] $categories
 */
class Task extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%task}}';
    }

    public function rules()
    {
        return [
            [['organization_id', 'name', 'type_id', 'description', 'location', 'task_date'], 'required'],
            [['organization_id', 'type_id', 'participants_count', 'max_score', 'status_id', 'is_deleted'], 'integer'],
            [['task_date', 'created_at', 'updated_at'], 'safe'],
            [['name', 'description', 'location'], 'string', 'max' => 255],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'organization_id' => Yii::t('app', 'Organization ID'),
            'name' => Yii::t('app', 'Name'),
            'type_id' => Yii::t('app', 'Type ID'),
            'description' => Yii::t('app', 'Description'),
            'location' => Yii::t('app', 'Location'),
            'task_date' => Yii::t('app', 'Task Date'),
            'participants_count' => Yii::t('app', 'Participants Count'),
            'max_score' => Yii::t('app', 'Max Score'),
            'status_id' => Yii::t('app', 'Status ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    public function getOrganization()
    {
        return $this->hasOne(Organization::class, ['id' => 'organization_id']);
    }

    public function getType()
    {
        return $this->hasOne(TaskType::class, ['id' => 'type_id']);
    }

    public function getStatus()
    {
        return $this->hasOne(TaskStatus::class, ['id' => 'status_id']);
    }

    public function getTaskUsers()
    {
        return $this->hasMany(TaskUser::class, ['task_id' => 'id']);
    }

    public function getUsersViaTaskUser()
    {
        return $this->hasMany(User::class, ['id' => 'user_id'])->via('taskUsers');
    }

    public function getCoordinators()
    {
        return $this->hasMany(User::class, ['id' => 'user_id'])
            ->via('taskUsers', function ($query) {
                $query->andWhere(['is_coordinator' => 1]);
            });
    }

    public function getParticipants()
    {
        return $this->hasMany(User::class, ['id' => 'user_id'])
            ->via('taskUsers', function ($query) {
                $query->andWhere(['is_coordinator' => 0]);
            });
    }

    public function getTaskCategories()
    {
        return $this->hasMany(TaskCategory::class, ['task_id' => 'id']);
    }

    public function getCategories()
    {
        return $this->hasMany(Category::class, ['id' => 'category_id'])
            ->via('taskCategories');
    }
}
