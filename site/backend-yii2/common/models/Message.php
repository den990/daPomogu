<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "{{%message}}".
 *
 * @property int $id
 * @property int $chat_id
 * @property int $user_id
 * @property string $message
 * @property int $is_read
 * @property string $created_at
 */
class Message extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%message}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['chat_id', 'user_id', 'message'], 'required'],
            [['chat_id', 'user_id'], 'integer'],
            [['message'], 'string'],
            [['is_read'], 'boolean'],
            [['created_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'chat_id' => 'Chat ID',
            'user_id' => 'User ID',
            'message' => 'Message',
            'is_read' => 'Is Read',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets the chat associated with the message.
     * @return \yii\db\ActiveQuery
     */
    public function getChat()
    {
        return $this->hasOne(Chat::class, ['id' => 'chat_id']);
    }

    /**
     * Gets the user who sent the message.
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    public function beforeSave($insert)
    {
        if ($insert) {
            $this->created_at = date('Y-m-d H:i:s');
        }
        return parent::beforeSave($insert);
    }
}
