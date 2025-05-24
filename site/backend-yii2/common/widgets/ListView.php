<?php


namespace common\widgets;


class ListView extends \yii\widgets\ListView
{
    public $layout = '<div class="mb-3">{summary}</div><div>{items}</div><div class="mt-3">{pager}</div>';

    public $pager = [
        'class' => 'yii\widgets\LinkPager',
        'linkOptions' => [
            'class' => 'page-link',
        ],
        'linkContainerOptions' => [
            'class' => 'page-item',
        ],
        'disabledListItemSubTagOptions' => [
            'tag' => 'a',
            'class' => 'page-link'
        ],
        'options' => [
            'class' => 'pagination pagination-sm mt-4'
        ]
    ];
}