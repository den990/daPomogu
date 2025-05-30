<?php

namespace console\controllers;

use common\models\Task;
use common\models\TaskStatus;
use yii\console\Controller;

class TaskController extends Controller
{
    public function actionUpdateStatus()
    {
        $now = (new \DateTime('now', new \DateTimeZone('UTC')))->format('Y-m-d H:i:s');

        $tasks = Task::find()
            ->where(['<', 'task_date', $now])
            ->all();

        foreach ($tasks as $task) {
            $task->status_id = TaskStatus::STATUS_IN_WORK;
            $task->save(false);
        }
    }

}