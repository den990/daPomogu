<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%chat}}`.
 */
class m250413_154650_create_chat_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%chat}}', [
            'id' => $this->primaryKey(),
            'user1_id' => $this->integer()->unsigned()->notNull(),
            'user2_id' => $this->integer()->unsigned()->notNull(),
            'updated_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP()'),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP()'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%chat}}');
    }
}
