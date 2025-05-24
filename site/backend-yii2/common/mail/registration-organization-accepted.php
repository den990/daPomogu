<?php
/* @var $organization \common\models\Organization */
/* @var $password string */
use yii\helpers\Html;
?>

<div>
    Здравствуйте: <?= $organization->full_name_owner ?> !<br>
    Ваша заявка на регистрацию одобрена.<br>
    Ваш пароль: <strong><?= $password ?></strong>
</div>