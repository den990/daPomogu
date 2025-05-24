<?php

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=mysql;dbname=' . $params['dbName'],
            'username' => $params['dbUser'],
            'password' => $params['dbPassword'],
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'common\components\apimailer\Unisender',
            'apiKey' => $params['unisenderApiKey'],
            'useFileTransport' => true,
            'messageConfig' => [
                'from' => ['noreply@site.ru' => 'Email Sender'],
            ],
        ],
    ],
];
