<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%statistic}}`.
 */
class m250513_162142_create_statistic_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%user_monthly_statistics}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'year' => $this->integer()->notNull(),
            'month' => $this->integer()->notNull(),
            'score' => $this->integer()->defaultValue(0),
            'tasks_count' => $this->integer()->defaultValue(0),
            'rank' => $this->integer()->defaultValue(null),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);

        $this->createIndex(
            'idx-unique_user_month',
            '{{%user_monthly_statistics}}',
            ['user_id', 'year', 'month'],
            true
        );
    }

    public function safeDown()
    {
        $this->dropIndex(
            'idx-unique_user_month',
            '{{%user_monthly_statistics}}'
        );

        $this->dropTable('{{%user_monthly_statistics}}');
    }
}
