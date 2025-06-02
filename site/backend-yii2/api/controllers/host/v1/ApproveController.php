<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use api\models\forms\ApproveTaskForm;
use common\models\ApproveTask;
use common\models\ApproveTaskStatus;
use common\models\TaskUser;
use common\models\User;
use Yii;
use yii\data\Pagination;
use yii\helpers\ArrayHelper;
use yii\web\NotFoundHttpException;

class ApproveController extends AppController
{
    const COUNT_RECORDS_LIST = 100;
    const ACTION_FOR_ORGANIZATION = ['show', 'get', 'confirm', 'reject'];
    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }

        if (!isset(Yii::$app->params['user.id']))
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');

        $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
        if (!$user) {
            throw new \yii\web\UnauthorizedHttpException('Доступ запрещён.');
        }

        if (in_array($action, self::ACTION_FOR_ORGANIZATION))
        {
            if (!$this->isOwnerOrCoordinator())
                return false;
        }

        return true;
    }

    public function actionCreate()
    {
        $model = ApproveTaskForm::findOne(['user_id' => Yii::$app->params['user.id']]);
        file_put_contents('json.txt', print_r(Yii::$app->request->post(), true));
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return ApiResponse::success();
        }

        return ApiResponse::error(400, null, $model->errors);
    }

    public function actionShow($task_id, $page = 1)
    {
        $query = ApproveTask::find()
            ->where(['task_id' => $task_id, 'status_id' => ApproveTaskStatus::STATUS_PENDING])
            ->with(['user', 'approveFiles.file']);

        $pagination = new Pagination([
            'totalCount' => $query->count(),
            'pageSize' => self::COUNT_RECORDS_LIST,
            'page' => $page - 1,
        ]);

        $models = $query
            ->offset($pagination->offset)
            ->limit($pagination->limit)
            ->all();

        $res = [];
        $coordinatorsIds = ArrayHelper::getColumn(TaskUser::find()->where(['task_id' => $task_id, 'is_coordinator' => 1])-> all(), 'user_id');
        foreach ($models as $model) {
            if (in_array($model->user->id, $coordinatorsIds))
                continue;

            $imageData = file_get_contents($model->user->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
            $res[] = [
                'id' => $model->id,
                'task_id' => $model->task_id,
                'user' => [
                    'id' => $model->user->id ?? null,
                    'name' => $model->user->name ?? null,
                    'surname' => $model->user->surname ?? null,
                    'avatar' => $avatarBase64,
                ],
            ];
        }

        return ApiResponse::success([
            'data' => $res,
            'total_pages' => $pagination->getPageCount(),
            'current_page' => $pagination->getPage() + 1,
        ]);
    }

    public function actionGet($id) {
        $model = $this->findApproveTask($id);

        $imageData = file_get_contents($model->user->avatarUrl);
        $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);

        $images = [];
        foreach ($model->approveFiles as $approveFile)
        {
            $imageData = file_get_contents($approveFile->file->url) ?? null;
            $approveBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
            $images[] = $approveBase64;
        }

        return ApiResponse::success([
            'id' => $model->id,
            'user' => [
                'id' => $model->user->id ?? null,
                'name' => $model->user->name ?? null,
                'surname' => $model->user->surname ?? null,
                'avatar' => $avatarBase64,
            ],
            'files' => $images,
            'task_id' => $model->task_id,
            'task_max_score' => $model->task->max_score,
        ]);
    }

    public function actionConfirm($id)
    {
        $body = Yii::$app->request->getBodyParams();
        $score = $body['score'] ?? null;

        if ($score === null) {
            return ApiResponse::error(400, null, Yii::t('app', 'Score must be required'));
        }

        $model = $this->findApproveTask($id);
        $model->status_id = ApproveTaskStatus::STATUS_ACCEPTED;
        $model->approved_id = Yii::$app->params['user.id'];
        $model->score = $score;

        if (!$model->save(false, ['status_id', 'score'])) {
            return ApiResponse::error(422, null, $model->errors);
        }

        return ApiResponse::success();
    }

    public function actionReject($id)
    {
        $score = $this->request->post('score');
        $model = $this->findApproveTask($id);
        $model->status_id = ApproveTaskStatus::STATUS_REJECTED;
        $model->score = $score;
        if (!$model->save(false, ['status_id', 'score']))
            return ApiResponse::error(422, null, $model->errors);

        return ApiResponse::success();
    }

    protected function findApproveTask($id)
    {
        if($model = ApproveTask::findOne(['id' => $id])) {
            return $model;
        }

        throw new NotFoundHttpException('Model not found');
    }

    private function isOwnerOrCoordinator()
    {
        $userId = Yii::$app->params['user.id'];
        $user = User::findOne(['id' => $userId]);

        if ($user->organizationOwner)
            return true;

        if ($coordinator = TaskUser::findOne(['user_id' => $user->id, 'is_coordinator' => 1]))
            return true;

        return false;
    }
}