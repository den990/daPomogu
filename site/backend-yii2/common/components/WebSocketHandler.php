<?php

namespace common\components;

use consik\yii2websocket\events\WSClientEvent;
use consik\yii2websocket\WebSocketServer;
use Ratchet\ConnectionInterface;
use Yii;
use sizeg\jwt\Jwt;
use yii\web\UnauthorizedHttpException;

class WebSocketHandler extends WebSocketServer
{
    public function init()
    {
        parent::init();

        $this->on(self::EVENT_CLIENT_CONNECTED, function (WSClientEvent $e) {
            $e->client->user_id = null;
            $e->client->room_id = null;
        });
    }

    protected function getCommand(ConnectionInterface $from, $msg)
    {
        $request = json_decode($msg, true);
        return !empty($request['action']) ? $request['action'] : parent::getCommand($from, $msg);
    }


    public function commandSetUser(ConnectionInterface $client, $msg)
    {
        $request = json_decode($msg, true);
        $result = ['message' => 'User set'];

        try {
            if (empty($request['token']) || empty($request['room_id'])) {
                throw new \Exception('Token or room_id missing');
            }

            /** @var Jwt $jwt */
            $jwt = Yii::$app->jwt;
            $signer = $jwt->getSigner('HS256');
            $key = $jwt->getKey();
            $token = $jwt->getParser()->parse((string)$request['token']);

            if (!$token->verify($signer, $key)) {
                throw new UnauthorizedHttpException('Invalid token signature');
            }

            $client->user_id = $token->getClaim('user_id');
            $client->room_id = (int)$request['room_id'];
        } catch (\Exception $e) {
            $result['message'] = 'Auth failed: ' . $e->getMessage();
        }

        $client->send(json_encode($result));
    }

    public function commandGetComments(ConnectionInterface $client, $msg)
    {
        if (!$client->room_id) {
            $client->send(json_encode(['error' => 'No room assigned']));
            return;
        }

        $comments = $this->getComments($client->room_id);

        $client->send(json_encode([
            'type' => 'message',
            'data' => ['rows' => $comments],
        ]));
    }

    public function commandCreateComment(ConnectionInterface $client, $msg)
    {
        $request = json_decode($msg, true);
        $text = trim($request['data'] ?? '');

        if (!$client->user_id || !$client->room_id) {
            $client->send(json_encode(['error' => 'Not authorized or no room']));
            return;
        }

        if (!$text) {
            $client->send(json_encode(['error' => 'Empty comment']));
            return;
        }

        $this->createComment($client->room_id, $client->user_id, $text);

        $comments = $this->getComments($client->room_id);

        foreach ($this->clients as $c) {
            if ($c->room_id == $client->room_id) {
                $c->send(json_encode([
                    'type' => 'message',
                    'data' => ['rows' => $comments],
                ]));
            }
        }
    }

    private function getComments($taskId)
    {
        $comments = \common\models\Comment::find()
            ->where(['task_id' => $taskId])
            ->with(['user', 'user.organizationOwner'])
            ->orderBy(['created_at' => SORT_DESC])
            ->limit(100)
            ->all();


        return array_map(function ($comment) {
            $organization = $comment->user->organizationOwner;
            file_put_contents('allo.txt', print_r($organization ? $organization->avatarUrl : $comment->user->avatarUrl, true));
            $imageData = file_get_contents($organization ? $organization->avatarUrl : $comment->user->avatarUrl);
            $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
            return [
                'comment' => [
                    'ID' => $comment->id,
                    'Comment' => $comment->comment,
                    'CreatedAt' => $comment->created_at,
                ],
                'user' => [
                    'id' => $comment->user->id ?? null,
                    'name' => $organization ? $organization->name : $comment->user->name,
                    'surname' => $organization ? null : $comment->user->surname,
                    'avatar' => $avatarBase64,
                ],
            ];
        }, $comments);
    }

    private function createComment($taskId, $userId, $text)
    {
        $comment = new \common\models\Comment();
        $comment->task_id = $taskId;
        $comment->user_id = $userId;
        $comment->comment = $text;

        if (!$comment->save()) {
            Yii::error("❌ Ошибка при сохранении комментария: " . json_encode($comment->errors), __METHOD__);
        }
    }

    public function commandGetMessages(ConnectionInterface $client, $msg)
    {
        if (!$client->room_id) {
            $client->send(json_encode(['error' => 'No chat assigned']));
            return;
        }

        $messages = $this->getMessages($client->room_id);

        $client->send(json_encode([
            'type' => 'chat',
            'data' => ['rows' => $messages],
        ]));
    }

    public function commandCreateMessage(ConnectionInterface $client, $msg)
    {
        $request = json_decode($msg, true);
        $text = trim($request['data'] ?? '');

        if (!$client->user_id || !$client->room_id) {
            $client->send(json_encode(['error' => 'Not authorized or no chat']));
            return;
        }

        if (!$text) {
            $client->send(json_encode(['error' => 'Empty message']));
            return;
        }

        $message = $this->createMessage($client->room_id, $client->user_id, $text);

        if (empty($message)) {
            $client->send(json_encode(['error' => 'Message creation failed']));
            return;
        }

        foreach ($this->clients as $c) {
            if ($c->room_id == $client->room_id) {
                $c->send(json_encode([
                    'type' => 'chat',
                    'data' => ['rows' => $message],
                ]));
            }
        }
    }


    private function getMessages($chatId)
    {
        $messages = \common\models\Message::find()
            ->where(['chat_id' => $chatId])
            ->with('user')
            ->orderBy(['created_at' => SORT_DESC])
            ->limit(100)
            ->all();

        return array_map(function ($msg) {
            return [
                'id' => $msg->id,
                'message' => $msg->message,
                'created_at' => $msg->created_at,
                'user' => [
                    'id' => $msg->user->id,
                    'name' => $msg->user->name,
                    'avatar' => file_get_contents($msg->user->avatarUrl),
                ],
            ];
        }, $messages);
    }

    private function createMessage($chatId, $userId, $text)
    {
        $message = new \common\models\Message();
        $message->chat_id = $chatId;
        $message->user_id = $userId;
        $message->message = $text;

        if (!$message->save()) {
            Yii::error("Ошибка при сохранении сообщения: " . json_encode($message->errors), __METHOD__);
        }

        $imageData = file_get_contents($message->user->avatarUrl);
        $avatarBase64 = 'data:image/jpeg;base64,' . base64_encode($imageData);
        return [
            'id' => $message->id,
            'message' => $message->message,
            'created_at' => $message->created_at,
            'user' => [
                'id' => $message->user->id,
                'name' => $message->user->name,
                'avatar' => $avatarBase64,
            ],
        ];
    }
}
