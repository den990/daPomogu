<?php

namespace console\controllers;

use common\components\WebSocketHandler;
use consik\yii2websocket\WebSocketServer;
use yii\console\Controller;

class WebsocketController extends Controller
{
    public function actionStart()
    {
        $server = new WebSocketHandler();
        $server->port = 8081;

        echo "🚀 WebSocket сервер запущен на порту 8081...\n";
        $server->start();
    }
}