<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "task_status".
 *
 * @property int $id
 * @property string|null $name
 */
class TaskStatus extends ActiveRecord
{
    const STATUS_COMPLETE = 1;
    const STATUS_NOT_COMPLETE = 2;
    const STATUS_IN_WORK = 3;
    const STATUS_NOT_STARTING = 4;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task_status';
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
            'name' => 'Status Name',
        ];
    }
}
