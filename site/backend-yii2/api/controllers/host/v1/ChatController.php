<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use common\models\Chat;
use common\models\Message;
use common\models\User;
use Yii;

class ChatController extends AppController
{
    const COUNT_MESSAGE = 20;

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

        return true;
    }

    public function actionCreate()
    {
        $user1Id = Yii::$app->params['user.id'];
        $user2Id = $this->request->post('user_id');
        if (!$user1Id || !$user2Id)
            return ApiResponse::error(400, null, Yii::t('app', 'user1_id and user2_id must be required'));

        if (Chat::findOne(['user1_id' => $user1Id, 'user2_id' => $user2Id]))
            return ApiResponse::success();

        $model = new Chat();
        $model->user1_id = $user1Id;
        $model->user2_id = $user2Id;
        if (!$model->save())
            return ApiResponse::error(422 , null, $model->errors);

        return ApiResponse::success();
    }

    public function actionShow()
    {
        $userId = Yii::$app->params['user.id'];
        $chats = Chat::find()->where(['OR', 'user1_id' => $userId, 'user2_id' => $userId])->all();

        $res = [];
        foreach ($chats as $chat) {
            $isMatch = $chat->user1_id == $userId;
            if ($isMatch)
                $imageData = file_get_contents($chat->user2->avatarUrl);
            else
                $imageData = file_get_contents($chat->user1->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
            $res[] = [
                'id' => $chat->id,
                'name' => $isMatch ? $chat->user2->name : $chat->user1->name,
                'patronymic' => $isMatch ? $chat->user2->patronymic : $chat->user1->patronymic,
                'avatar' => $avatarBase64,
                'updated_at' => $chat->updated_at,
            ];
        }

        return ApiResponse::success($res);
    }

    public function actionGetMessages($chat_id, $offset)
    {
        $messages = Message::find()
            ->where(['chat_id' => $chat_id])
            ->orderBy(['created_at' => SORT_DESC])
            ->offset($offset)
            ->limit(self::COUNT_MESSAGE)
            ->all();

        $res = [];
        foreach ($messages as $message) {
            $imageData = file_get_contents($message->user->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
            $res[] = [
                'message' => $message->message,
                'user' => [
                    'id' => $message->user->id,
                    'name' => $message->user->name,
                    'patronymic' => $message->user->patronymic,
                    'avatar' => $avatarBase64,
                ],
                'created_at' => $message->created_at,
            ];
        }

        return ApiResponse::success($res);
    }
}