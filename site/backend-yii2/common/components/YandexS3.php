<?php


namespace common\components;


class YandexS3
{
    public static function clientParams()
    {
        return [
            'version' => 'latest',
            'endpoint' => 'https://storage.yandexcloud.net',
            'region' => 'ru-central1',
            'credentials' => new YandexS3Credentials()
        ];
    }
}