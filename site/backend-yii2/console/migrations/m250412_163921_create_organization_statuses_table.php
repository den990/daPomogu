<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%organization_statuses}}`.
 */
class m250412_163921_create_organization_statuses_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('organization_statuses', [
            'id' => $this->primaryKey(),
            'name' => $this->string(20)->unique()->notNull(),
        ]);

        $this->batchInsert('organization_statuses', ['name'], [
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
        $this->dropTable('{{%organization_statuses}}');
    }
}
