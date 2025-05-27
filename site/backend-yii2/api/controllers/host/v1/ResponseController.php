<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use common\models\Response;
use common\models\ResponseStatus;
use common\models\Task;
use common\models\TaskStatus;
use common\models\User;
use Yii;
use yii\data\Pagination;
use yii\filters\VerbFilter;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\web\UnauthorizedHttpException;

class ResponseController extends AppController
{
    const COUNT_RECORDS_LIST = 7;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'get-not-confirmed' => ['GET', 'OPTIONS'],
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }

        if (!isset(Yii::$app->params['user.id']))
            throw new UnauthorizedHttpException('Доступ запрещён.');

        $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
        if (!$user) {
            throw new UnauthorizedHttpException('Доступ запрещён.');
        }

        return true;
    }

    public function actionGet($task_id = null, $page = 1)
    {
        if (!$task_id)
            return ApiResponse::error(400, null, \Yii::t('app', 'Task id must be required'));

        $query = Response::find()->where(['task_id' => $task_id]);
        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);
        $responses = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->asArray()
            ->all();

        return ApiResponse::success($responses);
    }

    public function actionGetNotConfirmed($page = 1, $task_id = null)
    {
        if (!$task_id) {
            return ApiResponse::error(400, null, \Yii::t('app', 'Task id must be required'));
        }

        $query = Response::find()
            ->with('user')
            ->where(['task_id' => $task_id, 'status_id' => ResponseStatus::STATUS_PENDING]);

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $responses = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

        $result = [];
        foreach ($responses as $response) {
            $result[] = [
                'id' => $response->id,
                'task_id' => $response->task_id,
                'user' => $response->user
                    ? $response->user->toArray(['id', 'surname', 'name', 'is_admin'])
                    : null,
            ];
        }

        return ApiResponse::success($result);
    }

    public function actionShow($id)
    {
        if (!$id)
            return ApiResponse::error(400, null, Yii::t('app', 'Response id must be required'));
        $response = $this->findResponse($id);

        return ApiResponse::success($response);
    }

    public function actionConfirm($id)
    {
        if (!$id)
            return ApiResponse::error(400, null, Yii::t('app', 'Response id must be required'));

        $response = $this->findResponse($id);
        $response->status_id = ResponseStatus::STATUS_ACCEPTED;
        $response->setScenario('confirm');

        if (!$response->save())
            return ApiResponse::error(422, null, $response->errors);

        return ApiResponse::success();
    }

    public function actionDelete($task_id, $user_id)
    {
        if (!$task_id || !$user_id)
            return ApiResponse::error(400, null, Yii::t('app', 'Task id and User id must be required'));

        $response = $this->findResponseByTaskIdAndUserId($task_id, $user_id);

        if (!$response->delete())
            return ApiResponse::error(422, null, $response->errors);

        return ApiResponse::success();
    }

    public function actionCreate() {
        $userId = Yii::$app->params['user.id'];
        $taskId = $this->request->post('task_id');
        if (!$userId || !$taskId)
            return ApiResponse::error(400, null, Yii::t('app', 'User Id and Task Id must be required'));

        if ($exist = Response::findOne(['user_id' => $userId, 'task_id' => $taskId]))
            return ApiResponse::error(400, null, Yii::t('app', 'Response are exist'));
        $task = Task::findOne(['id' => $taskId]);

        if ($task->status_id != TaskStatus::STATUS_NOT_STARTING)
            return ApiResponse::error(400, null, Yii::t('app', 'Task are started'));
        $response = new Response();
        $response->user_id = $userId;
        $response->task_id = $taskId;
        $response->status_id = ResponseStatus::STATUS_PENDING;

        if (!$response->save())
            return ApiResponse::error(400, null, $response->errors);

        return ApiResponse::success();
    }

    protected function findResponse($id)
    {
        if($model = Response::findOne(['id' => $id])) {
            return $model;
        }

        throw new NotFoundHttpException('Model not found');
    }

    protected function findResponseByTaskIdAndUserId($task_id, $user_id)
    {
        if($model = Response::findOne(['task_id' => $task_id, 'user_id' => $user_id])) {
            return $model;
        }

        throw new NotFoundHttpException('Model not found');
    }
}