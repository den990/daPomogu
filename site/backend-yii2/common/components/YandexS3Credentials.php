<?php


namespace common\components;


use Aws\Credentials\CredentialsInterface;
use Yii;

class YandexS3Credentials implements CredentialsInterface
{
    /**
     * Returns the AWS access key ID for this credentials object.
     *
     * @return string
     */
    public function getAccessKeyId()
    {
        return Yii::$app->params['yandexS3AccessKeyID'];
    }

    /**
     * Returns the AWS secret access key for this credentials object.
     *
     * @return string
     */
    public function getSecretKey()
    {
        return Yii::$app->params['yandexS3SecretKey'];
    }

    /**
     * Get the associated security token if available
     *
     * @return string|null
     */
    public function getSecurityToken()
    {
        return null;
    }

    /**
     * Get the UNIX timestamp in which the credentials will expire
     *
     * @return int|null
     */
    public function getExpiration()
    {
        return null;
    }

    /**
     * Check if the credentials are expired
     *
     * @return bool
     */
    public function isExpired()
    {
        return false;
    }

    /**
     * Converts the credentials to an associative array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'aws_access_key_id' => self::getAccessKeyId(),
            'aws_secret_access_key' => self::getSecretKey(),
        ];
    }
}