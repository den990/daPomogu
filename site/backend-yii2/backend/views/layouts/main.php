<?php

/* @var $this \yii\web\View */

/* @var $content string */

use backend\assets\AppAsset1;
use common\widgets\Alert;
use yii\bootstrap5\Breadcrumbs;
use yii\helpers\Html;

AppAsset1::register($this);

?>
<?php $this->beginPage() ?>
    <!DOCTYPE html>
    <html lang="<?= Yii::$app->language ?>" class="h-100">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <?php $this->registerCsrfMetaTags() ?>
        <title><?= Yii::$app->name . ' | ' . Html::encode($this->title) ?></title>
        <?php $this->head() ?>
    </head>
    <body>
    <?php $this->beginBody() ?>

    <header>
        <nav class="navbar navbar-expand-lg bg-white shadow-sm">
            <div class="container">
                <?= Html::a(Yii::$app->name, ['/'], ['class' => 'navbar-brand']) ?>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="d-flex flex-row flex-fill align-items-center">
                        <div class="flex-fill">
                            <ul class="navbar-nav me-auto d-flex flex-row align-items-center justify-content-center">
                                <?php foreach (\backend\components\Menu::navBar() as $item) {
                                    echo Html::tag(
                                        'li',
                                        Html::a($item['label'], $item['url'], \yii\helpers\ArrayHelper::merge(
                                            (!empty($item['linkOptions']) ? $item['linkOptions'] : []),
                                            [
                                                'class' => 'nav-link ' . ($item['active'] ? '' : 'active')
                                            ]
                                        )), ['class' => 'nav-item',]
                                    );
                                } ?>
                            </ul>
                        </div>
                        <div>
                            <?= Html::beginForm(['/site/logout'], 'post', ['class' => 'form-inline'])
                            . Html::submitButton(
                                Yii::t('app', 'Выйти ({username})', [
                                    'username' => Yii::$app->user->identity ? Yii::$app->user->identity->initials() : 'Пользователь не определен'
                                ]),
                                ['class' => 'btn btn-sm btn-outline-dark']
                            )
                            . Html::endForm() ?>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main role="main">
        <div class="container pt-4 pb-5">
            <?= Breadcrumbs::widget([
                'homeLink' => false,
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <h1 class="mb-4 mt-4"><?= $this->title ?></h1>
            <?= Alert::widget() ?>
            <?= $content ?>
        </div>
    </main>

    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>