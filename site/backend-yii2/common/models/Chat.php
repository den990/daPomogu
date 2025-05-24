<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "chat".
 *
 * @property int $id
 * @property int $user1_id
 * @property int $user2_id
 * @property string $updated_at
 * @property string $created_at
 *
 * @property User $user1
 * @property User $user2
 */
class Chat extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'chat';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user1_id', 'user2_id'], 'required'],
            [['user1_id', 'user2_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user1_id' => 'User 1 ID',
            'user2_id' => 'User 2 ID',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets the first user in chat.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser1()
    {
        return $this->hasOne(User::class, ['id' => 'user1_id']);
    }

    /**
     * Gets the second user in chat.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser2()
    {
        return $this->hasOne(User::class, ['id' => 'user2_id']);
    }
}
