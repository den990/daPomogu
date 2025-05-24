<?php

/* @var $this \yii\web\View */

/* @var $content string */

use frontend\assets\AppAsset;
use common\widgets\Alert;
use yii\bootstrap5\Breadcrumbs;
use yii\helpers\Html;

AppAsset::register($this);

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
        <nav class="navbar bg-light">
            <div class="container">
                <a class="link-dark" data-bs-toggle="offcanvas" href="#offcanvasMenu" role="button" aria-controls="offcanvasMenu">
                    <i class="fa-solid fa-bars fa-xl"></i>
                </a>
            </div>
        </nav>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title"><?= Yii::$app->name ?></h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <div class="flex-fill">
                    <? foreach (\frontend\components\Menu::navBar() as $item): ?>
                        <?= Html::tag('div',
                            Html::a($item['label'], $item['url'], \yii\helpers\ArrayHelper::merge(
                                (!empty($item['linkOptions']) ? $item['linkOptions'] : []),
                                [
                                    'class' => $item['active'] ? 'link-dark' : ''
                                ]
                            )), [
                                'class' => 'my-2',
                            ]) ?>
                    <? endforeach; ?>
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
    </header>

    <main role="main">
        <div class="container pt-4 pb-5">
            <?= Breadcrumbs::widget([
                'homeLink' => false,
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <h3 class="mb-4 mt-4"><?= $this->title ?></h3>
            <?= Alert::widget() ?>
            <?= $content ?>
        </div>
    </main>

    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>