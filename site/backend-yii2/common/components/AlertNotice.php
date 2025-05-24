<?php
/**
 * Created by PhpStorm.
 * User: ingener
 * Date: 04.08.2021
 * Time: 11:19
 */

namespace common\components;


use Yii;

class AlertNotice
{
    const SUCCESS_MSG = 'Действие выполнено успешно';
    const ERROR_MSG = 'Ошибка при выполнении действия. Попробуйте еще раз';

    public static function addSuccess($msg = self::SUCCESS_MSG)
    {
        $session = Yii::$app->session;
        $messages = $session->getFlash('success', []);
        $messages[] = $msg;
        Yii::$app->session->setFlash('success', $messages);
    }

    public static function addWarning($msg)
    {
        $session = Yii::$app->session;
        $messages = $session->getFlash('warning', []);
        $messages[] = $msg;
        Yii::$app->session->setFlash('warning', $messages);
    }

    public static function addError($msg = self::ERROR_MSG)
    {
        $session = Yii::$app->session;
        $messages = $session->getFlash('error', []);
        $messages[] = $msg;
        Yii::$app->session->setFlash('error', $messages);
    }
}