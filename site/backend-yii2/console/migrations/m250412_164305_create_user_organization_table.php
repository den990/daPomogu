<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user_organization}}`.
 */
class m250412_164305_create_user_organization_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user_organization', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->unsigned()->notNull(),
            'organization_id' => $this->integer()->unsigned()->notNull(),
            'is_owner' => $this->tinyInteger(1)->defaultValue(0),
            'is_accepted' => $this->tinyInteger(1)->defaultValue(0),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%user_organization}}');
    }
}
