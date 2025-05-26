<?php

$params = array_merge(
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'language' => 'ru-RU',
    'bootstrap' => ['log'],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'formatter' => [
            'dateFormat' => 'php:d.m.Y',
            'datetimeFormat' => 'php:d.m.Y H:i',
            'decimalSeparator' => ',',
            'thousandSeparator' => ' ',
            'nullDisplay' => '',
            'timeZone' => 'UTC',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'logVars' => [],
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager'
        ],
        'i18n' => [
            'translations' => [
                'app' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@common/messages',
                    'sourceLanguage' => 'en-US',
                    'on missingTranslation' => ['common\components\AppCommon', 'handleMissingTranslation'],
                    'fileMap' => [
                        'app' => 'app.php',
                    ],
                ],
            ],
        ],
        'jwt' => [
            'class' => 'sizeg\jwt\Jwt',
            'key' => 'verysecret',
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
                'port' => '465',
                'encryption' => 'ssl',
            ],
        ],
        'emailService' => [
            'class' => 'common\components\EmailService',
        ],
    ]
];
