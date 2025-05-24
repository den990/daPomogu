<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "approve_file".
 *
 * @property int $id
 * @property int $user_id
 * @property int $file_id
 * @property int $approve_task_id
 *
 * @property User $user
 * @property File $file
 * @property ApproveTask $approveTask
 */
class ApproveFile extends ActiveRecord
{
    public static function tableName()
    {
        return 'approve_file';
    }

    public function rules()
    {
        return [
            [['user_id', 'file_id', 'approve_task_id'], 'required'],
            [['user_id', 'file_id', 'approve_task_id'], 'integer'],
        ];
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    public function getFile()
    {
        return $this->hasOne(File::class, ['id' => 'file_id']);
    }

    public function getApproveTask()
    {
        return $this->hasOne(ApproveTask::class, ['id' => 'approve_task_id']);
    }
}
