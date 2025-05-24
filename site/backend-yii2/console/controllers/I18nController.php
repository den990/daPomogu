<?php


namespace console\controllers;


use common\components\AppCommon;
use Yii;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\httpclient\Client;
use yii\httpclient\Response;

class I18nController extends Controller
{
    private $russiaLanguage = 'ru-RU';

    public function actionTranslateToRussian($category = 'app')
    {
        return $this->to($this->russiaLanguage, $category);
    }

    private function to($language, $category)
    {
        $filePath = "@common/messages/$language/$category.php";

        if(file_exists(Yii::getAlias($filePath))) {
            $messages = require Yii::getAlias($filePath);
        } else {
            $this->stdout("Файл для \$language=$language и \$category=$category не найден");
            return ExitCode::DATAERR;
        }

        $noTranslated = [];
        foreach ($messages as $msg => $translate){
            if(empty($translate)) $noTranslated[] = $msg;
            if(count($noTranslated) > 99) break;
            continue;
        }

        if(empty($noTranslated)){
            $this->stdout("Сообщений для перевода не обнаружено");
            return ExitCode::OK;
        }

        $namedPointers = [];
        foreach ($noTranslated as $key => $message){
            $result = preg_match_all('/{[a-zA-Z0-9_]+}/', $message, $matches);
            if($result){
                foreach ($matches[0] as $match) {
                    $tempName = "$$$$" . (count($namedPointers) + 1) . "$$$$";
                    $namedPointers[$tempName] = $match;
                    $noTranslated[$key] = str_replace($match, $tempName, $noTranslated[$key]);
                }
            }
        }

        $translations = $this->getTranslate($noTranslated, explode('-', $language)[0]);

        if($translations){
            $translatedMessages = [];
            foreach ($translations as $translation){
                $translatedMessages[] = $translation['text'];
            }

            foreach ($translatedMessages as $key => $message){
                $result = preg_match_all('/\$\$\$\$[0-9]+\$\$\$\$/', $message, $matches);
                if($result){
                    foreach ($matches[0] as $match) {
                        $translatedMessages[$key] = str_replace($match, $namedPointers[$match], $translatedMessages[$key]);
                    }
                }
            }

            foreach ($noTranslated as $key => $message){
                $result = preg_match_all('/\$\$\$\$[0-9]+\$\$\$\$/', $message, $matches);
                if($result){
                    foreach ($matches[0] as $match) {
                        $noTranslated[$key] = str_replace($match, $namedPointers[$match], $noTranslated[$key]);
                    }
                }
            }

            foreach ($translatedMessages as $key => $message){
                $messages[$noTranslated[$key]] = $message;
            }


            $txt = "<?php \nreturn [\n";
            foreach ($messages as $msg => $translate){
                $txt .= sprintf("\t'%s' => '%s',\n", $msg, $translate);
            }
            $txt .= "];";

            $fp = fopen(Yii::getAlias($filePath), 'w');
            fwrite($fp, $txt);
            fclose($fp);

            $this->stdout("Перевод выполнен. Переведено " . count($noTranslated) . " из " . count($messages) . " сообщений");
            return ExitCode::OK;
        }

        $this->stdout("Переводы не были получены от переводчика");
        return ExitCode::UNSPECIFIED_ERROR;
    }

    protected function getTranslate($messages, $direction)
    {
        $client = new Client([
            'transport' => 'yii\httpclient\CurlTransport'
        ]);
        /* @var $response Response */
        $response = $client->createRequest()
            ->setUrl('https://translate.api.cloud.yandex.net/translate/v2/translate')
            ->setFormat(Client::FORMAT_JSON)
            ->setMethod('POST')
            ->setHeaders([
                'Content-Type: application/json',
                "Authorization: Api-Key " . Yii::$app->params['yandexTranslateApiKey']
            ])
            ->setData([
                'sourceLanguageCode' => 'en',
                'targetLanguageCode' => $direction,
                'texts' => $messages,
                'format' => 'HTML'
            ])
            ->send();

        if ($response->isOk) {
            return $response->data['translations'];
        }
        return null;
    }

}