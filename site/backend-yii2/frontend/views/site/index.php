<?php
/* @var $this yii\web\View */
/* @var $storageFileUploadForm \frontend\models\forms\StorageFileUploadForm */
/* @var $s3FileUploadForm \frontend\models\forms\StorageFileUploadForm */
/* @var $localFiles \common\models\File[] */
/* @var $s3Files \common\models\File[] */

use common\widgets\ActiveForm;
use yii\helpers\Html;

$this->title = 'Introduction';

$js = <<<JS
setTimeout(function() {
    var div = $('<div>', {
      html: 'Кнопка, генерируемая через 2 секунды после загрузки страницы'  ,
      class: 'my-2'
  });
    div.append($('<button>', {
            html: 'Acceptance test',
            id: 'testButton',
            class: 'btn ms-2 btn-outline-success',
            type: 'button'
        }));
  $('#acceptanceBlock').append(div)
}, 2000)
JS;

$this->registerJs($js);

?>

<hr>
<div>
    <h2>Реализация ссылок между приложениями frontend и backend</h2>
    <?= Html::a(Yii::$app->urlManagerBackend->createUrl(['/site/index']), Yii::$app->urlManagerBackend->createUrl(['/site/index'])) ?>
</div>

<hr>
<div>
    <h2>Загрузка файлов</h2>
    <div class="my-3">
        В шаблоне проекта реализовано два варианта загрузки файла:
        <ul>
            <li>В локальное хранилище <code>storage</code></li>
            <li>В S3 совместимое хранилище Yandex Cloud - Object Storage</li>
        </ul>
        Использование S3 хранилища более предпочтительный вариант, рекомендуется
        использовать его во всех проектах
    </div>
    <div class="mt-4 border rounded p-3">
        <h5>Пример загрузки файла в локальное хранилище</h5>
        <div class="row">
            <div class="col-5">
                <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data'], 'action' => ['file-upload']]) ?>

                <?= $form->field($storageFileUploadForm, 'file')->fileInput() ?>

                <?= Html::submitButton('Загрузить', ['class' => 'btn btn-outline-success']) ?>

                <?php ActiveForm::end() ?>
            </div>
        </div>
        <h6 class="mt-4">Загруженные файлы:</h6>
        <?php foreach ($localFiles as $file){
            echo Html::tag(
                'div',
                Html::a($file->baseName(), $file->url(), ['target' => '_blank'])
                . Html::a('Удалить', ['file-delete', 'id' => $file->id],
                    ['data-method' => 'post', 'data-confirm' => 'Продолжить?',
                        'class' => 'link-danger ms-2']),
                ['class' => 'mb-1']
            );
        } ?>
    </div>
    <div class="mt-4 border rounded p-3">
        <h5>Пример загрузки файла в S3 хранилище</h5>
        <div class="alert alert-primary my-3">
            Чтобы приложение могло загружать файлы в бакет и удалять их,
            нужно дать сервисному аккаунту роль <code>storage.editor</code>
        </div>
        <div class="row">
            <div class="col-5">
                <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data'], 'action' => ['s3-file-upload']]) ?>

                <?= $form->field($s3FileUploadForm, 'prefix')->textInput()->hint('Можно казать префикс к ключу загружаемого файла') ?>

                <?= $form->field($s3FileUploadForm, 'file')->fileInput() ?>

                <?= Html::submitButton('Загрузить', ['class' => 'btn btn-outline-success']) ?>

                <?php ActiveForm::end() ?>
            </div>
        </div>
        <h6 class="mt-4">Загруженные файлы:</h6>
        <?php foreach ($s3Files as $file){
            echo Html::tag(
                'div',
                Html::a($file->baseName(), $file->url(), ['target' => '_blank'])
                . Html::a('Удалить', ['file-delete', 'id' => $file->id],
                    ['data-method' => 'post', 'data-confirm' => 'Продолжить?',
                        'class' => 'link-danger ms-2']),
                ['class' => 'mb-1']
            );
        } ?>
    </div>
</div>

<hr>
<div id="acceptanceBlock">
    <h2>Приемочное тестирование</h2>
    <div class="card my-4">
        <div class="card-body bg-light">
            <p class="mb-1">
                Этот блок для демонстрации работы приемочного теста
                <code>frontend/tests/acceptance/SiteIndexCest.php</code>
            </p>
            <p class="mb-0">
                О том, как запустить сценарий, читайте в <code>README.md</code>
            </p>
        </div>
    </div>
    <button id="exampleBtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Модальное окно для тестирования
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Модальное окно для тестирования</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Во время тестирования это окно должно открыться
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
