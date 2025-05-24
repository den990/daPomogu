<?php

namespace common\components;


use Yii;
use yii\helpers\Html;

class ActionColumn extends \yii\grid\ActionColumn
{
    public $buttons = [];

    public function init()
    {
        if(empty($this->buttons)) {
            $this->buttons = [
                'view' => function ($url, $model, $key) {
                    return Html::a('<i class="fas fa-eye"></i>', $url, [
                        'class' => 'text-dark',
                        'title' => Yii::t('app', 'Детальный вид')
                    ]);
                },
                'update' => function ($url, $model, $key) {
                    return Html::a('<i class="fas fa-edit"></i>', $url, [
                        'class' => 'text-primary',
                        'title' => Yii::t('app', 'Редактировать')
                    ]);
                },
                'delete' => function ($url, $model, $key) {
                    return Html::a('<i class="fas fa-times"></i>', $url, [
                        'class' => 'text-danger',
                        'title' => Yii::t('app', 'Удалить'),
                        'data-confirm' => Yii::t(
                            'app',
                            'Вы собираетесь удалить "{object}". Подтвердите свое действие. Продолжить?',
                            ['object' => $key]
                        ),
                        'data-method' => 'post',
                        'data-pjax' => 0,
                    ]);
                },
            ];
        }
    }

    protected function renderDataCellContent($model, $key, $index)
    {
        $content = preg_replace_callback('/\\{([\w\-\/]+)\\}/', function ($matches) use ($model, $key, $index) {
            $name = $matches[1];

            if (isset($this->visibleButtons[$name])) {
                $isVisible = $this->visibleButtons[$name] instanceof \Closure
                    ? call_user_func($this->visibleButtons[$name], $model, $key, $index)
                    : $this->visibleButtons[$name];
            } else {
                $isVisible = true;
            }

            if ($isVisible && isset($this->buttons[$name])) {
                $url = $this->createUrl($name, $model, $key, $index);
                return Html::tag('div', call_user_func($this->buttons[$name], $url, $model, $key),
                    ['class' => 'ms-3']);
            }

            return '';
        }, $this->template);

        return Html::tag('div', $content, ['class' => 'd-flex flex-row']);
    }
}