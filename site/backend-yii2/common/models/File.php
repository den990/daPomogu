<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "file".
 *
 * @property int $id
 * @property string $src
 * @property string|null $uploaded_at
 */
class File extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%file}}';
    }

    public function rules()
    {
        return [
            [['src'], 'required'],
            [['src'], 'string'],
            [['uploaded_at'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'src' => 'Источник файла',
            'uploaded_at' => 'Дата загрузки',
        ];
    }

    /**
     * Вернёт абсолютную ссылку, если src — относительный путь.
     */
    public function getUrl()
    {
        return Yii::getAlias('@webroot') . '/' . ltrim($this->src, '/');
    }
}
