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
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            'useFileTransport' => false,
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'smtp.gmail.com',
                'username' => 'koldyrev03@gmail.com',
                'password' => 'lpkhhnmyyywnakbl',
                'port' => '587',
                'encryption' => 'tls',
            ],
        ],
    ],
];
