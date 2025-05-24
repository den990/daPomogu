<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task}}`.
 */
class m250413_153155_create_task_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task}}', [
            'id' => $this->primaryKey(),
            'organization_id' => $this->integer()->unsigned()->notNull(),
            'name' => $this->string()->notNull(),
            'type_id' => $this->integer()->notNull(),
            'description' => $this->string()->notNull(),
            'location' => $this->string()->notNull(),
            'task_date' => $this->dateTime()->notNull(),
            'participants_count' => $this->integer(),
            'max_score' => $this->integer(),
            'is_deleted' => $this->tinyInteger(1)->defaultValue(0),
            'status_id' => $this->integer()->defaultValue(4),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%task}}');
    }
}
