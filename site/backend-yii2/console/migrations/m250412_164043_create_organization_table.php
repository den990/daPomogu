<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%organization}}`.
 */
class m250412_164043_create_organization_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('organization', [
            'id' => $this->primaryKey(),
            'email' => $this->string(150)->notNull()->unique(),
            'phone' => $this->string(18)->notNull(),
            'name' => $this->string()->notNull(),
            'inn' => $this->string(12)->unique()->notNull(),
            'avatar_id' => $this->integer()->unsigned(),
            'legal_address' => $this->string()->notNull(),
            'actual_address' => $this->string()->notNull(),
            'status_id' => $this->integer()->notNull(),
            'full_name_owner' => $this->string()->notNull(),
            'is_blocked' => $this->tinyInteger(1)->defaultValue(0),
            'created_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->dateTime()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%organization}}');
    }
}
