<?php

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=mysql;dbname=' . $params['dbName'],
            'username' => $params['dbUser'],
            'password' => $params['dbPassword'],
            'charset' => 'utf8',
            'enableSchemaCache' => true,
            'schemaCacheDuration' => 60,
            'schemaCache' => 'cache',
        ],
        'mailer' => [
            'class' => 'common\components\apimailer\Unisender',
            'apiKey' => $params['unisenderApiKey'],
            'useFileTransport' => false,
            'messageConfig' => [
                'from' => ['noreply@site.ru' => 'Email Sender'],
            ],
        ],
    ],
];
