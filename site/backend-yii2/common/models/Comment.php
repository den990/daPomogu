<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "comment".
 *
 * @property int $id
 * @property int $task_id
 * @property int $user_id
 * @property string $comment
 * @property string $created_at
 *
 * @property User $user
 * @property Task $task
 */
class Comment extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%comment}}';
    }

    public function rules()
    {
        return [
            [['task_id', 'user_id', 'comment'], 'required'],
            [['task_id', 'user_id'], 'integer'],
            [['comment'], 'string'],
            [['created_at'], 'safe'],
        ];
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    public function getTask()
    {
        return $this->hasOne(Task::class, ['id' => 'task_id']);
    }
}
