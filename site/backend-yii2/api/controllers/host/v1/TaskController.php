<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use api\models\forms\TaskForm;
use api\models\forms\UserForm;
use common\models\Response;
use common\models\ResponseStatus;
use common\models\Task;
use common\models\TaskStatus;
use common\models\TaskType;
use common\models\TaskUser;
use common\models\User;
use Yii;
use yii\data\Pagination;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

class TaskController extends Controller
{
    const COUNT_RECORDS_LIST = 10;
    const ACTIONS_WITHOUT_LOGIN = ['show-all',];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'create' => ['post', 'options'],
                'show' => ['get', 'options'],
                'show-all' => ['get', 'options'],
                'get-my-opened-tasks' => ['get', 'options'],
                'update' => ['put', 'options'],
            ],
        ];
        return $behaviors;
    }

    public function beforeAction($action)
    {
        $this->setCorsHeaders();
        if (!in_array($action->id, self::ACTIONS_WITHOUT_LOGIN)) {
            if (Yii::$app->request->isOptions) {
                Yii::$app->response->statusCode = 200;
                Yii::$app->response->content = '';
                Yii::$app->response->send();
                return false;
            }

            if (!parent::beforeAction($action)) {
                return false;
            }

            if (!$this->auth()) {
                throw new UnauthorizedHttpException('Invalid or expired JWT token');
            }

            if (!isset(Yii::$app->params['user.id']))
                throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');

            $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
            if (!$user) {
                throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');
            }

            return true;
        }
        else {
            if (!parent::beforeAction($action)) {
                return false;
            }

            return true;
        }
    }

    public function actionCreate()
    {
        $model = new TaskForm();
        $model->load(Yii::$app->request->post());
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user)
            return ApiResponse::error(400, null, Yii::t('app', 'User not found'));
        $model->organization_id = $user->organizationOwner->id;
        $model->status_id = TaskStatus::STATUS_NOT_STARTING;

        if ($model->save()) {
            return ApiResponse::success($model->id);
        }

        return ApiResponse::error(422, null, $model->errors, 422);
    }

    public function actionUpdate($id = null) {
        if ($id === null) {
            return ApiResponse::error(400, null, Yii::t('app', 'Id must required'));
        }

        $model = TaskForm::findOne(['id' => $id]);
        $user = User::findOne(['id' => Yii::$app->params['user.id']]);
        if (!$user->organizationOwner || $model->organization_id != $user->organizationOwner->id)
            return ApiResponse::error(403, null, Yii::t('app', 'Access denied'));
        if ($model->status_id != TaskStatus::STATUS_NOT_STARTING)
            return ApiResponse::error(400, null, Yii::t('app', 'Task are starting!'));

        $model->setScenario('update');
        if ($model->load(Yii::$app->request->getBodyParams()) && $model->save())
            return ApiResponse::success();

        return ApiResponse::error(500, 'Save Error', $model->getFirstErrors(), 500);
    }

    public function actionShowAll($page = 1)
    {
        $query = Task::find()->with(['organization', 'categories', 'taskUsers']);

        if ($this->auth()) {
            $user = User::findOne(['id' => Yii::$app->params['user.id']]);
            $orgIds = ArrayHelper::getColumn($user->organizations, 'id');
            $query->andWhere([
                'or',
                ['type_id' => TaskType::TYPE_OPENED, 'status_id' => TaskStatus::STATUS_NOT_STARTING],
                [
                    'and',
                    ['type_id' => TaskType::TYPE_CLOSED,],
                    ['organization_id' => $orgIds],
                ]
            ]);
        } else {
            $query->andWhere(['type_id' => TaskType::TYPE_OPENED]);
        }

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $tasks = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

        $data = [];

        foreach ($tasks as $task) {
            $categories = [];
            foreach ($task->categories as $category) {
                $categories[] = [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            }

            $countApplying = count($task->participants);

            $data[] = [
                'organization_name' => $task->organization->name ?? '',
                'tasks' => [
                    'id' => (int)$task->id,
                    'organization_id' => (int)$task->organization_id,
                    'name' => $task->name,
                    'type_id' => (int)$task->type_id,
                    'description' => $task->description,
                    'location' => $task->location,
                    'task_date' => $task->task_date,
                    'participants_count' => $task->participants_count !== null ? (int)$task->participants_count : null,
                    'max_score' => $task->max_score !== null ? (int)$task->max_score : null,
                    'status_id' => (int)$task->status_id,
                    'is_deleted' => $task->is_deleted,
                    'created_at' => $task->created_at,
                    'updated_at' => $task->updated_at,
                ],
                'categories' => $categories,
                'count_applying' => $countApplying,
            ];
        }

        return ApiResponse::success([
            'data' => $data,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionShow($id = null)
    {
        if ($id === null) {
            return ApiResponse::error(400, null, Yii::t('app', 'Id must required'));
        }

        $task = Task::find()
            ->with(['organization', 'coordinators', 'categories'])
            ->where(['id' => $id, 'is_deleted' => 0])
            ->one();

        if (!$task) {
            return ApiResponse::error(400, null, Yii::t('app', 'Task not found'));
        }

        if ($this->auth())
        {
            $response = Response::findOne(['user_id' => Yii::$app->params['user.id'], 'task_id' => $id, 'status_id' => ResponseStatus::STATUS_PENDING]);
            $recorded = TaskUser::findOne(['user_id' => Yii::$app->params['user.id'], 'task_id' => $id]);
            $user = User::findOne(['id' => Yii::$app->params['user.id']]);
            if ($user->organizationOwner && $id == $user->organizationOwner->id)
                $role = 'owner';
            else {
                $role = $recorded ? $recorded->is_coordinator == 1 ? 'coordinator' : 'participant' : 'user';
            }
        } else {
            $response = null;
            $recorded = null;
            $role = 'user';
        }

        return ApiResponse::success([
            'id' => $task->id,
            'organization_id' => $task->organization_id,
            'organization_name' => $task->organization->name ?? null,
            'name' => $task->name,
            'type_id' => $task->type_id,
            'description' => $task->description,
            'location' => $task->location,
            'task_date' => $task->task_date,
            'participants_count' => $task->participants_count,
            'max_score' => $task->max_score,
            'status_id' => $task->status_id,
            'created_at' => $task->created_at,
            'updated_at' => $task->updated_at,
            'coordinators' => array_map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'surname' => $c->surname,
                ];
            }, $task->coordinators),
            'categories' => array_map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                ];
            }, $task->categories),
            'is_recorded' => (bool)$recorded,
            'is_response' => (bool)$response,
            'role_in_task' => $role,
            'recorded_count' => count($task->participants),
            'points' => null,
        ]);
    }

    public function actionGetMyOpenedTasks($page = 1)
    {
        $userId = Yii::$app->params['user.id'];

        if (Yii::$app->params['user.role'] == 'organization') {
            $user = User::findOne(['id' => $userId]);
            $query = Task::find()
                ->with(['organization', 'categories', 'taskUsers'])
                ->where(['organization_id' => $user->organizationOwner->id, 'is_deleted' => 0])
                ->andWhere(['<>', 'status_id', TaskStatus::STATUS_COMPLETE]);
        } else {
            $query = Task::find()
                ->joinWith('taskUsers')
                ->with(['organization', 'categories', 'taskUsers'])
                ->where(['task_user.user_id' => $userId, 'is_deleted' => 0])
                ->andWhere(['<>', 'status_id', TaskStatus::STATUS_COMPLETE]);
        }

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $tasks = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();
        $data = [];

        foreach ($tasks as $task) {
            $categories = [];
            foreach ($task->categories as $c) {
                $categories[] = [
                    'id' => $c->id,
                    'name' => $c->name,
                ];
            }

            $data[] = [
                'id' => $task->id,
                'name' => $task->name,
                'status_id' => $task->status_id,
                'organization_name' => $task->organization->name ?? '',
                'task_date' => $task->task_date,
                'categories' => $categories,
            ];
        }

        return ApiResponse::success([
            'data' => $data,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionGetMyClosedTasks($page = 1)
    {
        $userId = Yii::$app->params['user.id'];

        if (Yii::$app->params['user.role'] == 'organization') {
            $user = User::findOne(['id' => $userId]);
            $query = Task::find()
                ->with(['organization', 'categories', 'taskUsers'])
                ->where(['organization_id' => $user->organizationOwner->id, 'status_id' => TaskStatus::STATUS_COMPLETE, 'is_deleted' => 0]);
        } else {
            $query = Task::find()
                ->joinWith('taskUsers')
                ->with(['organization', 'categories', 'taskUsers'])
                ->where(['task_user.user_id' => $userId, 'status_id' => TaskStatus::STATUS_COMPLETE, 'is_deleted' => 0]);
        }

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $tasks = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();
        $data = [];

        foreach ($tasks as $task) {
            $categories = [];
            foreach ($task->categories as $c) {
                $categories[] = [
                    'id' => $c->id,
                    'name' => $c->name,
                ];
            }

            $data[] = [
                'id' => $task->id,
                'name' => $task->name,
                'status_id' => $task->status_id,
                'organization_name' => $task->organization->name ?? '',
                'task_date' => $task->task_date,
                'categories' => $categories,
            ];
        }

        return ApiResponse::success([
            'data' => $data,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionDelete($id) {
        $userId = Yii::$app->params['user.id'];
        $user = User::findOne(['id' => $id]);
        $task = Task::findOne(['id' => $id]);

        if (!$task)
            return ApiResponse::error(404, null, Yii::t('app', 'Task not found'));

        if ($user && ($user->is_admin || ($user->organizationOwner && $user->organizationOwner->id == $task->organization_id))) {
            $task->is_deleted = 1;
            if (!$task->save(false, ['is_deleted']))
                return ApiResponse::error(422, null, $task->errors);
        } else
            return ApiResponse::error(403, null, Yii::t('app', 'You do not have permission to delete this task'));

        return ApiResponse::success();
    }

    public function actionComplete($id) {
        $userId = Yii::$app->params['user.id'];
        $user = User::findOne(['id' => $id]);
        $task = TaskForm::findOne(['id' => $id]);

        if (!$task)
            return ApiResponse::error(404, null, Yii::t('app', 'Task not found'));

        if ($user && ($user->is_admin || ($user->organizationOwner && $user->organizationOwner->id == $task->organization_id))) {
            $task->status_id = TaskStatus::STATUS_COMPLETE;
            $task->setScenario('complete');
            if (!$task->save())
                return ApiResponse::error(422, null, $task->errors);
        } else
            return ApiResponse::error(403, null, Yii::t('app', 'You do not have permission to delete this task'));

        return ApiResponse::success();
    }


    private function auth()
    {
        $header = Yii::$app->request->getHeaders()->get('Authorization');

        if (!$header || !preg_match('/^Bearer\s+(.*?)$/', $header, $matches)) {
            return false;
        }

        $jwt = Yii::$app->jwt;
        $tokenString = $matches[1];

        try {
            $token = $jwt->loadToken($tokenString);
        } catch (\Throwable $e) {
            Yii::warning('JWT parsing failed: ' . $e->getMessage(), __METHOD__);
            return false;
        }

        if (!$token) {
            return false;
        }

        $userId = $token->getClaim('user_id');
        $role = $token->getClaim('role');

        Yii::$app->params['user.id'] = $userId;
        Yii::$app->params['user.role'] = $role;

        return true;
    }


    protected function setCorsHeaders()
    {
        $headers = Yii::$app->response->getHeaders();
        $headers->set('Access-Control-Allow-Origin', '*');
        $headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $headers->set('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
        $headers->set('Access-Control-Allow-Credentials', 'true');
        $headers->set('Access-Control-Expose-Headers', 'Authorization');
    }
}