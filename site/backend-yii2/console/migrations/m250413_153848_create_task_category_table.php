<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task_category}}`.
 */
class m250413_153848_create_task_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task_category}}', [
            'id' => $this->primaryKey(),
            'task_id' => $this->integer()->notNull(),
            'category_id' => $this->integer()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%task_category}}');
    }
}
