<?php

$params = array_merge(
    $params,
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'modules' => [],
    'components' => [
        'request' => [
            'enableCsrfCookie' => false,
            'enableCsrfValidation' => false,
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
                'multipart/form-data' => 'yii\web\MultipartFormDataParser'
            ]
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                if (!$response->isSuccessful) {
                    $response->data = api\components\ApiResponse::error(
                        $response->data["code"],
                        strtoupper($response->data["name"]),
                        $response->data["message"],
                        $response->statusCode
                    );
                }
            },
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                //site
                'register' => 'host/v1/site/signup',
                'register-organization' => 'host/v1/site/signup-organization',
                'login' => 'host/v1/site/login',

                //organization
                'GET profile-organization/<id:\d+>' => 'host/v1/organization/profile',
                'OPTIONS profile-organization/<id:\d+>' => 'host/v1/organization/profile',
                'GET api/profile-organization' => 'host/v1/organization/my-profile',
                'OPTIONS api/profile-organization' => 'host/v1/organization/my-profile',
                'GET organization/avatar' => 'host/v1/organization/get-my-avatar',
                'OPTIONS organization/avatar' => 'host/v1/organization/get-my-avatar',
                'GET organization/avatar/<id:\d+>' => 'host/v1/organization/get-avatar',
                'OPTIONS organization/avatar/<id:\d+>' => 'host/v1/organization/get-avatar',
                'GET organization/accepted-list/<page:\d+>' => 'host/v1/organization/get-organizations-accepted-list',
                'OPTIONS organization/accepted-list/<page:\d+>' => 'host/v1/organization/get-organizations-accepted-list',
                'GET api/organization/requests' => 'host/v1/organization/get-requests-to-apply',
                'OPTIONS api/organization/requests' => 'host/v1/organization/get-requests-to-apply',
                'PUT api/organization/requests/accept/<user_id:\d+>' => 'host/v1/organization/accept-attachment',
                'OPTIONS api/organization/requests/accept/<user_id:\d+>' => 'host/v1/organization/accept-attachment',
                'PUT api/organization/requests/reject/<user_id:\d+>' => 'host/v1/organization/reject-attachment',
                'OPTIONS api/organization/requests/reject/<user_id:\d+>' => 'host/v1/organization/reject-attachment',
                'GET api/organization/users/<page:\d+>' => 'host/v1/organization/get-my-volunteers',
                'OPTIONS api/organization/users/<page:\d+>' => 'host/v1/organization/get-my-volunteers',
                'GET api/organization/users' => 'host/v1/organization/get-my-volunteers',
                'OPTIONS api/organization/users' => 'host/v1/organization/get-my-volunteers',
                'PUT api/organization' => 'host/v1/organization/update',
                'OPTIONS api/organization' => 'host/v1/organization/update',
                'PUT api/organization/detach/<id:\d+>' => 'host/v1/organization/detach-user',
                'OPTIONS api/organization/detach/<id:\d+>' => 'host/v1/organization/detach-user',

                //admin
                'PUT api/organizations/<id:\d+>/apply' => 'host/v1/admin/apply-register-organization',
                'OPTIONS api/organizations/<id:\d+>/apply' => 'host/v1/admin/apply-register-organization',
                'PUT api/organizations/<id:\d+>/reject' => 'host/v1/admin/reject-register-organization',
                'OPTIONS api/organizations/<id:\d+>/reject' => 'host/v1/admin/reject-register-organization',
                'GET api/admin/organization/requests' => 'host/v1/admin/get-pending-organization-requests',
                'OPTIONS api/admin/organization/requests' => 'host/v1/admin/get-pending-organization-requests',
                'GET api/admin/statistic' => 'host/v1/admin/statistic',
                'OPTIONS api/admin/statistic' => 'host/v1/admin/statistic',
                'GET api/admin/users/<page:\d+>' => 'host/v1/admin/get-organization-user-list',
                'OPTIONS api/admin/users/<page:\d+>' => 'host/v1/admin/get-organization-user-list',
                'PUT api/admin/block-user/<id:\d+>' => 'host/v1/admin/block-user',
                'OPTIONS api/admin/block-user/<id:\d+>' => 'host/v1/admin/block-user',
                'PUT api/admin/unblock-user/<id:\d+>' => 'host/v1/admin/unblock-user',
                'OPTIONS api/admin/unblock-user/<id:\d+>' => 'host/v1/admin/unblock-user',

                //user
                'GET api/profile' => 'host/v1/user/profile-info',
                'OPTIONS api/profile' => 'host/v1/user/profile-info',
                'GET api/profile/<id:\d+>' => 'host/v1/user/profile-info',
                'OPTIONS api/profile/<id:\d+>' => 'host/v1/user/profile-info',
                'GET user/avatar' => 'host/v1/user/get-avatar',
                'OPTIONS user/avatar' => 'host/v1/user/get-avatar',
                'GET user/avatar/<id:\d+>' => 'host/v1/user/get-avatar',
                'OPTIONS user/avatar/<id:\d+>' => 'host/v1/user/get-avatar',
                'PUT api/change-password' => 'host/v1/user/change-password',
                'OPTIONS api/change-password' => 'host/v1/user/change-password',
                'PUT api/profile' => 'host/v1/user/update',
                'PUT api/profile/<id:\d+>' => 'host/v1/user/update',
                'api/attach-organization/<id:\d+>' => 'host/v1/user/attach-organization',
                'api/detach-organization/<id:\d+>' => 'host/v1/user/detach-organization',
                'api/user/organizations' => 'host/v1/user/organizations',

                //category
                'GET api/category' => 'host/v1/category/show',
                'OPTIONS api/category' => 'host/v1/category/show',

                //task
                'POST api/tasks' => 'host/v1/task/create',
                'GET api/tasks/<page:\d+>' => 'host/v1/task/show-all',
                'OPTIONS api/tasks/<page:\d+>' => 'host/v1/task/show-all',
                'GET api/task/<id:\d+>' => 'host/v1/task/show',
                'api/tasks/my-opened-tasks/<page:\d+>' => 'host/v1/task/get-my-opened-tasks',
                'api/tasks/my-closed-tasks/<page:\d+>' => 'host/v1/task/get-my-closed-tasks',
                'DELETE api/tasks/<id:\d+>' => 'host/v1/task/delete',
                'PUT api/tasks/complete/<id:\d+>' => 'host/v1/task/complete',
                'OPTIONS api/tasks/complete/<id:\d+>' => 'host/v1/task/complete',
                'PUT api/task/<id:\d+>' => 'host/v1/task/update',
                'OPTIONS api/task/<id:\d+>' => 'host/v1/task/update',

                //response
                'api/responses/notconfirmed/<page:\d+>/<task_id:\d+>' => 'host/v1/response/get-not-confirmed',
                'api/responses/<id:\d+>' => 'host/v1/response/show',
                'api/responses/confirm/<id:\d+>' => 'host/v1/response/confirm',
                'api/responses/delete/<task_id:\d+>/<user_id:\d+>' => 'host/v1/response/delete',
                'api/responses/create' => 'host/v1/response/create',

                //approve
                'api/approves/create' => 'host/v1/approve/create',
                'api/approves/show/<task_id:\d+>/<page:\d+>' => 'host/v1/approve/show',
                'api/approves/show/<id:\d+>' => 'host/v1/approve/get',
                'PUT api/approves/confirm/<id:\d+>' => 'host/v1/approve/confirm',
                'OPTIONS api/approves/confirm/<id:\d+>' => 'host/v1/approve/confirm',
                'api/approves/reject/<id:\d+>' => 'host/v1/approve/reject',

                //chat
                'api/chat' => 'host/v1/chat/create',
                'api/chats' => 'host/v1/chat/show',
                'api/chat/<chat_id:\d+>/messages/<offset:\d+>' => 'host/v1/chat/get-messages',

                //statistic
                'api/statistic/all' => 'host/v1/statistic/get-all',
                'api/statistic/organization/<organization_id:\d+>' => 'host/v1/statistic/get-by-organization',
                'api/statistic/organization' => 'host/v1/statistic/get-my-organization',

            ],
        ],
        'errorHandler' => [
            'errorAction' => '/site/error',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\DbTarget',
                    'logTable' => 'api_log',
                    'logVars' => [],
                    'levels' => ['error', 'warning'],
                    'categories' => ['yii\*'],
                ],
                [
                    'class' => 'yii\log\DbTarget',
                    'logTable' => 'api_log',
                    'logVars' => [],
                    'levels' => ['info', 'error', 'warning'],
                    'except' => ['yii\*'],
                ],
            ],
        ],
        'jwt' => [
            'class' => 'sizeg\jwt\Jwt',
            'key' => 'verysecret',
        ],
    ],
    'params' => $params,
];
