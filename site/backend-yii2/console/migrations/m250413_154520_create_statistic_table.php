<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%statistic}}`.
 */
class m250413_154520_create_statistic_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%statistic}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'points' => $this->integer()->notNull()->defaultValue(0),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%statistic}}');
    }
}
