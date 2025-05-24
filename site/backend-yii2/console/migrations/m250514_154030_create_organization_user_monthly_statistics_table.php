<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%organization_user_monthly_statistics}}`.
 */
class m250514_154030_create_organization_user_monthly_statistics_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%organization_user_monthly_statistics}}', [
            'id' => $this->primaryKey(),
            'organization_id' => $this->integer()->notNull(),
            'user_id' => $this->integer()->notNull(),
            'year' => $this->integer()->notNull(),
            'month' => $this->integer()->notNull(),
            'score' => $this->integer()->defaultValue(0),
            'tasks_count' => $this->integer()->defaultValue(0),
            'rank' => $this->integer()->defaultValue(null),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);

        $this->createIndex(
            'idx-org_user_month_unique',
            'organization_user_monthly_statistics',
            ['organization_id', 'user_id', 'year', 'month'],
            true
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%organization_user_monthly_statistics}}');
    }
}
