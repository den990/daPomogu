<?php
/* @var $user \common\models\User */
/* @var $organization \common\models\Organization */

use yii\helpers\Html;
?>

<div>
    Здравствуйте, <?= $user->name ?>!<br>
    Ваш запрос на прикрепление к организациий <?= $organization->name ?> принята
</div>