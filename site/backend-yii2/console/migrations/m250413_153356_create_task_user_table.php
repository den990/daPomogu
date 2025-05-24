<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task_user}}`.
 */
class m250413_153356_create_task_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task_user}}', [
            'id' => $this->primaryKey(),
            'task_id' => $this->integer()->notNull(),
            'user_id' => $this->integer()->notNull(),
            'is_coordinator' => $this->tinyInteger(1)->defaultValue(0),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%task_user}}');
    }
}
