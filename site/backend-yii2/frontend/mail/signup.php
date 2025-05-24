<?php
/**
 * Created by PhpStorm.
 */

/* @var $pwd string */
/* @var $email string */

$url = \yii\helpers\Url::to('/site/login', true);

?>

<div>
    Вы успешно зарегистрированы в личном кабинете <strong><?= Yii::$app->name ?></strong>
</div>
<div>
    Для входа в личный кабинет пройдите по ссылке
    <?= \yii\helpers\Html::a($url, $url) ?>
</div>

Новые данные доступа:
<div>
    Логин:
    <?= $email ?>
</div>
<div>
    Пароль:
    <strong><?= $pwd ?></strong>
</div>
