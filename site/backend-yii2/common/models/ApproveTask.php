<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "approve_task".
 *
 * @property int $id
 * @property int $task_id
 * @property int $user_id
 * @property int|null $status_id
 * @property int|null $score
 * @property int|null $approved_id
 * @property string|null $created_at
 *
 * @property ApproveTaskStatus $status
 * @property User $user
 * @property User $approvedBy
 * @property Task $task
 * @property ApproveFile[] $approveFiles
 */
class ApproveTask extends ActiveRecord
{
    public static function tableName()
    {
        return 'approve_task';
    }

    public function rules()
    {
        return [
            [['task_id', 'user_id'], 'required'],
            [['task_id', 'user_id', 'status_id', 'score', 'approved_id'], 'integer'],
            [['created_at'], 'safe'],
            [['status_id'], 'default', 'value' => 1],
        ];
    }

    public function getTask()
    {
        return $this->hasOne(Task::class, ['id' => 'task_id']);
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    public function getApprovedBy()
    {
        return $this->hasOne(User::class, ['id' => 'approved_id']);
    }

    public function getStatus()
    {
        return $this->hasOne(ApproveTaskStatus::class, ['id' => 'status_id']);
    }

    public function getApproveFiles()
    {
        return $this->hasMany(ApproveFile::class, ['approve_task_id' => 'id']);
    }
}
