<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%approve_task_status}}`.
 */
class m250413_154937_create_approve_task_status_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%approve_task_status}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
        ]);

        $this->batchInsert('{{%approve_task_status}}', ['name'], [
            ['На рассмотрении'],
            ['Принято'],
            ['Отказано'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%approve_task_status}}');
    }
}
