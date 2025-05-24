<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%approve_file}}`.
 */
class m250413_155122_create_approve_file_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%approve_file}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->unsigned()->notNull(),
            'file_id' => $this->integer()->unsigned()->notNull(),
            'approve_task_id' => $this->integer()->unsigned()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%approve_file}}');
    }
}
