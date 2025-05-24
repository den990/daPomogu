<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user}}`.
 */
class m250412_163252_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'email' => $this->string(150)->notNull()->unique(),
            'phone' => $this->string(18)->notNull(),
            'surname' => $this->string(),
            'name' => $this->string()->notNull(),
            'patronymic' => $this->string(),
            'date_of_birthday' => $this->date(),
            'address' => $this->string(),
            'password_hash' => $this->text()->notNull(),
            'is_admin' => $this->tinyInteger(1)->defaultValue(0),
            'is_blocked' => $this->tinyInteger(1)->defaultValue(0),
            'avatar_id' => $this->integer()->unsigned(),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);

        $this->insert('user', [
            'email' => 'admin@example.com',
            'phone' => '+1234567890',
            'surname' => 'Admin',
            'name' => 'Admin',
            'patronymic' => 'Admin',
            'password_hash' => Yii::$app->security->generatePasswordHash('admin'),
            'is_admin' => true,
            'created_at' => new \yii\db\Expression('CURRENT_TIMESTAMP'),
            'updated_at' => new \yii\db\Expression('CURRENT_TIMESTAMP'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%user}}');
    }
}
