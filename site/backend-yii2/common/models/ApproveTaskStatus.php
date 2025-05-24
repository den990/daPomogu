<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "approve_task_status".
 *
 * @property int $id
 * @property string|null $name
 *
 * @property ApproveTask[] $approveTasks
 */
class ApproveTaskStatus extends ActiveRecord
{
    const STATUS_PENDING = 1;
    const STATUS_ACCEPTED = 2;
    const STATUS_REJECTED = 3;
    public static function tableName()
    {
        return 'approve_task_status';
    }

    public function rules()
    {
        return [
            [['name'], 'string', 'max' => 255],
        ];
    }

    public function getApproveTasks()
    {
        return $this->hasMany(ApproveTask::class, ['status_id' => 'id']);
    }
}
