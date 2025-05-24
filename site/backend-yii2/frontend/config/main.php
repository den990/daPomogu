<?php

$params = array_merge(
    $params,
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'frontend\controllers',
    'defaultRoute' => 'site/index',
    'bootstrap' => ['mobileDetect'],
    'homeUrl' => '/site/index',
    'components' => [
        'request' => [
            'baseUrl' => '',
            'csrfParam' => '_csrf-frontend',
        ],
        'user' => [
            'identityClass' => 'frontend\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'session-frontend',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => require Yii::getAlias('@common/config/rules/frontend-rules.php'),
        ],
        'urlManagerBackend' => [
            'class' => 'yii\web\UrlManager',
            'baseUrl' => $params['backendUrl'],
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => require Yii::getAlias('@common/config/rules/backend-rules.php'),
        ],
        'mobileDetect' => [
            'class' => 'common\components\MobileDetect',
        ],
    ],
    'name' => 'IT Result Yii2 Project Template (Frontend)',
    'params' => $params,
];
