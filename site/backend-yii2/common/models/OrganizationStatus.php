<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "organization_statuses".
 *
 * @property int $id
 * @property string $name
 */
class OrganizationStatus extends ActiveRecord
{
    const STATUS_PENDING = 1;  // На рассмотрении
    const STATUS_ACCEPTED = 2; // Принято
    const STATUS_REJECTED = 3; // Отказано

    public static function tableName()
    {
        return '{{%organization_statuses}}';
    }

    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 20],
            [['name'], 'unique'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
        ];
    }
}
