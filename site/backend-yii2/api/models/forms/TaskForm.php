<?php

namespace api\models\forms;

use common\models\ApproveTask;
use common\models\ApproveTaskStatus;
use common\models\Task;
use common\models\TaskCategory;
use common\models\TaskStatus;
use common\models\TaskUser;
use Yii;
use yii\db\Transaction;
use yii\helpers\ArrayHelper;

class TaskForm extends Task
{
    public $category_ids = [];
    public $coordinate_ids = [];

    public function rules()
    {
        return ArrayHelper::merge(parent::rules(), [
            [['category_ids', 'coordinate_ids'], 'each', 'rule' => ['integer']],
        ]);
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();

        $scenarios['complete'] = ['status_id'];
        $scenarios['update'] = ['name', 'type_id', 'description', 'location', 'task_date', 'participants_count', 'max_score', 'status_id', 'category_ids', 'coordinate_ids'];

        return $scenarios;
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($runValidation && !$this->validate()) {
            return false;
        }

        $transaction = Yii::$app->db->beginTransaction();
        try {
            if ($this->task_date && strpos($this->task_date, 'T') !== false) {
                $this->task_date = date('Y-m-d H:i:s', strtotime($this->task_date));
            }
            $this->updated_at = (new \DateTime('now', new \DateTimeZone('UTC')))->format('Y-m-d H:i:s');
            switch ($this->scenario) {
                case 'complete':
                    if (!parent::save(false, ['status_id'])) {
                        $transaction->rollBack();
                        return false;
                    }
                    $coordinatorsIds = ArrayHelper::getColumn(TaskUser::find()->where(['task_id' => $this->id, 'is_coordinator' => 1])-> all(), 'user_id');
                    foreach ($this->taskUsers as $taskUser) {
                        $approve = new ApproveTask();
                        $approve->task_id = $this->id;
                        $approve->user_id = $taskUser->user_id;
                        $approve->status_id = ApproveTaskStatus::STATUS_PENDING;
                        if (in_array($taskUser->user_id, $coordinatorsIds))
                            $approve->score = $this->max_score;
                        if (!$approve->save()) {
                            $transaction->rollBack();
                            return false;
                        }
                    }
                    break;

                case 'update':
                    if (!parent::save(false)) {
                        $transaction->rollBack();
                        return false;
                    }

                    TaskCategory::deleteAll(['task_id' => $this->id]);
                    foreach ($this->category_ids as $categoryId) {
                        $taskCategory = new TaskCategory([
                            'task_id' => $this->id,
                            'category_id' => $categoryId,
                        ]);
                        if (!$taskCategory->save()) {
                            $transaction->rollBack();
                            return false;
                        }
                    }

                    TaskUser::deleteAll(['task_id' => $this->id, 'is_coordinator' => true]);
                    foreach ($this->coordinate_ids as $userId) {
                        $taskUser = new TaskUser([
                            'task_id' => $this->id,
                            'user_id' => $userId,
                            'is_coordinator' => 1,
                        ]);
                        if (!$taskUser->save()) {
                            $transaction->rollBack();
                            return false;
                        }
                    }

                    break;

                default:
                    if (!parent::save(false)) {
                        $transaction->rollBack();
                        return false;
                    }
            }

            $transaction->commit();
            return true;
        } catch (\Throwable $e) {
            $transaction->rollBack();
            $this->addError('internal', $e->getMessage());
            return false;
        }
    }


    public function formName()
    {
        return '';
    }
}