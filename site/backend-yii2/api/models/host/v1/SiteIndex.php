<?php


namespace api\models\host\v1;


use yii\base\Model;

/**
 * Class SiteIndex
 * @package api\models\host\v1
 *
 * @property array $result
 */
class SiteIndex extends Model
{
    public $param;

    private $_result;

    public function rules()
    {
        return [
            [['param'], 'string']
        ];
    }

    public function execute()
    {
        $this->_result = [
            'modelParam' => $this->param
        ];

        return true;
    }

    public function getResult()
    {
        return $this->_result;
    }
}