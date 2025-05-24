<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "response_status".
 *
 * @property int $id
 * @property string|null $name
 *
 * @property Response[] $responses
 */
class ResponseStatus extends ActiveRecord
{
    const STATUS_PENDING = 1;     // На рассмотрении
    const STATUS_ACCEPTED = 2;    // Принято
    const STATUS_REJECTED = 3;    // Отказано
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'response_status';
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
            'name' => 'Название статуса',
        ];
    }

    /**
     * Gets related responses
     */
    public function getResponses()
    {
        return $this->hasMany(Response::class, ['status_id' => 'id']);
    }
}
