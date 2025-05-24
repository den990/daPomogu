<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%approve_task}}`.
 */
class m250413_155013_create_approve_task_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%approve_task}}', [
            'id' => $this->primaryKey(),
            'task_id' => $this->integer()->unsigned()->notNull(),
            'user_id' => $this->integer()->unsigned()->notNull(),
            'status_id' => $this->integer()->defaultValue(1),
            'score' => $this->integer()->defaultValue(0),
            'approved_id' => $this->integer()->unsigned(),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP()'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%approve_task}}');
    }
}
