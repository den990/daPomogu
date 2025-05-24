<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task_status}}`.
 */
class m250413_153026_create_task_status_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task_status}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
        ]);

        $this->batchInsert('{{%task_status}}', ['name'], [
            ['Выполнено'],
            ['Не выполнено'],
            ['В работе'],
            ['Не начато'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%task_status}}');
    }
}
