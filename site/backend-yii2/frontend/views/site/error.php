<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\Html;

$this->title = Yii::t('yii', $name);
?>
<div class="site-error">

    <div class="row vh-90 align-items-center justify-content-center">
        <div class="col-5">
            <h1 class="text-secondary">
                <?= Yii::t('app', 'Ошибка') ?>  <?= $exception->statusCode ?>
            </h1>

            <div class="card border-danger mt-3 border-2">
                <div class="card-body">
                    <h1 class="display-6">
                        <?= Yii::t('yii', $message) ?>
                    </h1>
                </div>
            </div>

            <p class="mt-3">
                <?= Yii::t('app', 'Указанная ошибка возникла во время выполнения запроса') ?>
            </p>
            <p>
                <?= Yii::t('app', 'Попробуйте вернуться на предыдущую страницу, перезагрузите её и выполните действие еще раз') ?>
            </p>
            <p>
                <?= Yii::t('app', 'Если ошибка повторяется, свяжитесь с администратором сайта') ?>
            </p>

            <div class="text-center mt-3">
                <?= Html::a(Yii::t('app','На главную'), \yii\helpers\Url::home(), [
                    'class' => 'btn btn-outline-primary'
                ]) ?>
            </div>
        </div>
    </div>

</div>
