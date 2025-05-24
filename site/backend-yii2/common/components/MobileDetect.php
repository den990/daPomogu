<?php

namespace common\components;

use Yii;
use yii\base\BootstrapInterface;
use yii\base\Theme;
use yii\web\Application;

class MobileDetect extends \yii\base\Component implements BootstrapInterface
{
    public $templatesForMobile = '@app/templates/mobile';
    public $templatesForTablet = '@app/templates/mobile';

    private $_detect;

    public function __construct($config)
    {
        $this->_detect = new \Detection\MobileDetect();
        parent::__construct($config);
    }
    
    public function isMobile() 
    {
        return $this->_detect->isMobile() or $this->_detect->isTablet();
    }

    public function isTablet()
    {
        return $this->_detect->isTablet();
    }

    public function isDesktop()
    {
        return !$this->_detect->isMobile() and !$this->_detect->isTablet();
    }

    public function bootstrap($app)
    {
        Yii::$app->on(Application::EVENT_BEFORE_REQUEST, function () {
            if ($this->isMobile()) {
                Yii::$app->view->theme = new Theme([
                    'pathMap' => [
                        '@app/views' => [
                            $this->templatesForMobile,
                        ],
                    ]
                ]);
            }
            if ($this->isTablet()) {
                Yii::$app->view->theme = new Theme([
                    'pathMap' => [
                        '@app/views' => [
                            $this->templatesForTablet,
                        ],
                    ]
                ]);
            }
        });
    }
}