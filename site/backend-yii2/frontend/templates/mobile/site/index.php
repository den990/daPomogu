<?php
/* @var $this yii\web\View */
/* @var $fileUploadForm \frontend\models\forms\StorageFileUploadForm */
/* @var $files \common\models\File[] */

use common\widgets\ActiveForm;
use yii\helpers\Html;

$this->title = 'Introduction (Mobile)';

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
    <h4>Загрузка файлов</h4>
    <div class="row">
        <div class="col-12">
            <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data'], 'action' => ['file-upload']]) ?>

            <?= $form->field($fileUploadForm, 'file')->fileInput() ?>

            <?= Html::submitButton('Загрузить', ['class' => 'btn btn-outline-success']) ?>

            <?php ActiveForm::end() ?>
        </div>
    </div>
    <h6 class="mt-4">Загруженные файлы:</h6>
    <? foreach ($files as $file): ?>
        <div class="mb-1"><?= Html::a($file->baseName(), $file->url(), ['target' => '_blank']) ?></div>
    <? endforeach; ?>
</div>

<hr>
<div id="acceptanceBlock">
    <h4>Приемочное тестирование</h4>
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
