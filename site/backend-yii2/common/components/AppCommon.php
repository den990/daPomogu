<?php


namespace common\components;


use Yii;
use yii\i18n\MissingTranslationEvent;

class AppCommon
{
    public static function handleMissingTranslation(MissingTranslationEvent $event)
    {
        if(!YII_DEBUG)
            return;

        if(empty($event->message))
            return;

        $filePath = "@app/runtime/$event->category" . "_missed_messages.php";

        if(file_exists(Yii::getAlias($filePath))) {
            $messages = require Yii::getAlias($filePath);
        }
        else {
            $messages = [];
        }
        $messages[$event->message] = '';

        $txt = "<?php \nreturn [\n";
        foreach ($messages as $msg => $translate){
            $txt .= "\t'$msg' => '$translate',\n";
        }
        $txt .= "];";

        $fp = fopen(Yii::getAlias($filePath), 'w');
        fwrite($fp, $txt);
        fclose($fp);
    }
}