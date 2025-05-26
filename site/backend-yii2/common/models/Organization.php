<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "organization".
 *
 * @property int $id
 * @property string $email
 * @property string $phone
 * @property string $name
 * @property string $inn
 * @property int|null $avatar_id
 * @property string $legal_address
 * @property string $actual_address
 * @property int $status_id
 * @property string $full_name_owner
 * @property int $is_blocked
 * @property string $created_at
 * @property string $updated_at
 *
 * @property File|null $avatar
 * @property OrganizationStatus $status
 * @property User $owner
 * @property Task[] $tasks
 * @property Task[] $activeTasks
 * @property string $avatarUrl
 */
class Organization extends ActiveRecord
{
    const COUNT_TASKS_IN_PROFILE = 5;
    public static function tableName()
    {
        return '{{%organization}}';
    }

    public function rules()
    {
        return [
            [['email', 'phone', 'name', 'inn', 'legal_address', 'actual_address', 'status_id', 'full_name_owner'], 'required'],
            [['status_id', 'avatar_id', 'is_blocked'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['email'], 'string', 'max' => 150],
            [['phone'], 'string', 'max' => 18],
            [['name', 'legal_address', 'actual_address', 'full_name_owner'], 'string', 'max' => 255],
            [['inn'], 'string', 'max' => 12],
            [['email'], 'unique'],
            [['inn'], 'unique'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'email' => Yii::t('app', 'Email'),
            'phone' => Yii::t('app', 'Phone'),
            'name' => Yii::t('app', 'Organization Name'),
            'inn' => Yii::t('app', 'INN'),
            'avatar_id' => Yii::t('app', 'Avatar'),
            'legal_address' => Yii::t('app', 'Legal Address'),
            'actual_address' => Yii::t('app', 'Actual Address'),
            'status_id' => Yii::t('app', 'Status'),
            'full_name_owner' => Yii::t('app', 'Full Name of Owner'),
            'is_blocked' => Yii::t('app', 'Is Blocked'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    public function getAvatar()
    {
        return $this->hasOne(File::class, ['id' => 'avatar_id']);
    }

    public function getStatus()
    {
        return $this->hasOne(OrganizationStatus::class, ['id' => 'status_id']);
    }

    public function getTasks()
    {
        return $this->hasMany(Task::class, ['organization_id' => 'id']);
    }

    public function getActiveTasks()
    {
        return $this->hasMany(Task::class, ['organization_id' => 'id'])
            ->andOnCondition(['status_id' => TaskStatus::STATUS_NOT_STARTING]);
    }

    public function getOwner()
    {
        return $this->hasOne(User::class, ['id' => 'user_id'])
            ->viaTable('user_organization', ['organization_id' => 'id'], function ($query) {
                $query->andWhere(['is_owner' => 1]);
            });
    }

    public function getAvatarUrl() {
        if ($this->avatar_id && $this->avatar) {
            return Yii::getAlias('@api') . '/web/' . $this->avatar->src;
        }
        return Yii::getAlias('@api') . '/web/images/no-avatar.jpg';
    }

    public function getDaysSinceRegistration(): int
    {
        $created = strtotime($this->created_at);
        $now = time();

        return (int)floor(($now - $created) / (60 * 60 * 24));
    }

    public function getTasksInProfile()
    {
        $data = [];
        $i = 0;
        foreach ($this->activeTasks as $task)
        {
            if (self::COUNT_TASKS_IN_PROFILE == $i)
                break;
            $data[] = [
              'id' => $task->id,
              'name' => $task->name,
              'task_date' => $task->task_date,
              'count_users' => TaskUser::find()->where(['task_id' => $task->id, 'is_coordinator' => 0])->count(),
            ];

            $i++;
        }

        return $data;
    }
}
