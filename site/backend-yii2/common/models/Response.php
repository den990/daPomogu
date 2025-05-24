<?php

namespace common\models;

use Throwable;
use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "response".
 *
 * @property int $id
 * @property int $task_id
 * @property int $user_id
 * @property int|null $status_id
 *
 * @property Task $task
 * @property User $user
 * @property ResponseStatus $status
 */
class Response extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'response';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['task_id', 'user_id'], 'required'],
            [['task_id', 'user_id', 'status_id'], 'integer'],
            [['task_id'], 'exist', 'skipOnError' => true, 'targetClass' => Task::class, 'targetAttribute' => ['task_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['status_id'], 'exist', 'skipOnError' => true, 'targetClass' => ResponseStatus::class, 'targetAttribute' => ['status_id' => 'id']],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();

        $scenarios['confirm'] = [
            'status_id'
        ];

        return $scenarios;
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'task_id' => 'Task ID',
            'user_id' => 'User ID',
            'status_id' => 'Status ID',
        ];
    }

    /**
     * Gets related Task
     */
    public function getTask()
    {
        return $this->hasOne(Task::class, ['id' => 'task_id']);
    }

    /**
     * Gets related User
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * Gets related Status
     */
    public function getStatus()
    {
        return $this->hasOne(ResponseStatus::class, ['id' => 'status_id']);
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($this->scenario == 'confirm') {
            $transaction = Yii::$app->db->beginTransaction();
            try {
                if (!parent::save($runValidation, $attributeNames)) {
                    goto rb;
                }
                $taskUser = new TaskUser();
                $taskUser->task_id = $this->task_id;
                $taskUser->user_id = $this->user_id;
                $taskUser->is_coordinator = 0;
                if (!$taskUser->save())
                    goto rb;

                $transaction->commit();

                return true;

                rb:
                $transaction->rollBack();
            } catch (Throwable $e) {
                $transaction->rollBack();
                return false;
            }
        }
        return parent::save($runValidation, $attributeNames);
    }
}
