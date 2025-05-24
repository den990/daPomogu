<?php

$params = array_merge(
    $params,
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'modules' => [],
    'defaultRoute' => '/order/index',
    'homeUrl' => '/backend/order/index',
    'components' => [
        'request' => [
            'baseUrl' => '/backend', // из-за этого стили и js летят
            'csrfParam' => '_csrf-backend',
            'csrfCookie' => [
                'httpOnly' => true,
                'path' => '/backend',
            ],
        ],
        'user' => [
            'identityClass' => 'backend\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => [
                'name' => '_identity-backend',
                'path' => '/backend',
                'httpOnly' => true,
            ],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'session-backend',
            'cookieParams' => [
                'path' => '/backend',
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => require Yii::getAlias('@common/config/rules/backend-rules.php'),
        ],
        'urlManagerFrontend' => [
            'class' => 'yii\web\UrlManager',
            'baseUrl' => $params['frontendUrl'],
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => require Yii::getAlias('@common/config/rules/frontend-rules.php'),
        ],
        'jwt' => [
            'class' => \sizeg\jwt\Jwt::class,
            'key'   => 'verysecret',
            'jwtValidationData' => \sizeg\jwt\JwtValidationData::class,
        ],
    ],
    'name' => 'IT Result Yii2 Project Template (Backend)',
    'params' => $params,
];
