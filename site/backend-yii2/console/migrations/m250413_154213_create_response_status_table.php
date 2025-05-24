<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%response_status}}`.
 */
class m250413_154213_create_response_status_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%response_status}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
        ]);

        $this->batchInsert('{{%response_status}}', ['name'], [
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
        $this->dropTable('{{%response_status}}');
    }
}
