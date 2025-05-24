<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task_type}}`.
 */
class m250413_153125_create_task_type_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task_type}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
        ]);

        $this->batchInsert('{{%task_type}}', ['name'], [
            ['Открытый'],
            ['Закрытый'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%task_type}}');
    }
}
