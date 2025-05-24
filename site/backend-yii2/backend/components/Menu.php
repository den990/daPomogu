<?php


namespace backend\components;


use Yii;
use yii\helpers\Html;

class Menu
{
    public static function navBar()
    {
        $active = Yii::$app->controller->id;

        return [
            [
                'label' => Yii::t('app', 'Главная'),
                'url' => ['/site/index'],
                'active' => $active == 'site',
                'access' => true,
            ],
        ];
    }

    public static function mobileNavBar()
    {
        return [];
    }
}