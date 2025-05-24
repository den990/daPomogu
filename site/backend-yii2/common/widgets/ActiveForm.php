<?php
/**
 * Created by PhpStorm.
 * User: ingener
 * Date: 07.12.2021
 * Time: 12:34
 */

namespace common\widgets;


class ActiveForm extends \yii\bootstrap5\ActiveForm
{
    public $fieldConfig = ['options' => ['class' => 'mb-3']];
}