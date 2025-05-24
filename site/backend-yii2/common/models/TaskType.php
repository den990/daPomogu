<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "task_type".
 *
 * @property int $id
 * @property string|null $name
 */
class TaskType extends ActiveRecord
{
    const TYPE_OPENED = 1;
    const TYPE_CLOSED = 2;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task_type';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Тип задания',
        ];
    }
}
