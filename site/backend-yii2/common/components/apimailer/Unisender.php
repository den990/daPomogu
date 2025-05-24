<?php /** @noinspection MissedFieldInspection */


namespace common\components\apimailer;


use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\helpers\ArrayHelper;
use yii\httpclient\Client;
use yii\httpclient\Response;
use yii\mail\BaseMailer;

/**
 * Class Unisender
 * @package common\components\apimailer
 */
class Unisender extends BaseMailer
{
    public $messageClass = 'common\components\apimailer\Message';

    // URL доступа к API сервиса рассылок email Unisender Go
    public $baseUrl = 'https://go1.unisender.ru/ru/transactional/api/v1/';

    // Ключ авторизации в API сервиса рассылок email Unisender Go
    protected $_apiKey;

    // Чтобы $_apiKey был не доступен для чтения, но мог быть записан
    // во время конфигурации
    public function setApiKey($key)
    {
        $this->_apiKey = $key;
    }

    public function init()
    {
        parent::init();
        $this->htmlLayout = '@common/mail/layouts/html';
        $this->textLayout = '@common/mail/layouts/text';
    }

    /**
     * @param \yii\mail\MessageInterface|Message $message
     * @return bool
     * @throws InvalidConfigException
     * @throws \yii\httpclient\Exception
     */
    protected function sendMessage($message)
    {
        $email = $message->getTo();
        if (is_array($email)) {
            if (ArrayHelper::isAssociative($email)) {
                $addresses = [];
                foreach ($email as $address => $name) {
                    $addresses[] = [
                        'email' => trim($address),
                        'substitutions' => [
                            'to_name' => trim($name),
                        ]
                    ];
                }
                $email = $addresses;
            } else {
                $addresses = [];
                foreach ($email as $address) {
                    $addresses[] = [
                        'email' => trim($address),
                    ];
                }
                $email = $addresses;
            }
        } else {
            $email = [
                [
                    'email' => trim($email),
                ]
            ];
        }

        $from = $message->getFrom();

        $senderName = null;
        $senderEmail = null;

        if (is_array($from)) {
            $count = count(array_keys($from));

            if ($count > 1 && ($count !== count($email))) {
                throw new InvalidConfigException('Unisender requires email, sender_name and sender_email have equal length or have only one element');
            }

            if (!ArrayHelper::isAssociative($from)) {
                throw new InvalidConfigException('You should use associative array for the "from" attribute');
            }

            foreach ($from as $address => $name) {
                $senderName = $name;
                $senderEmail = $address;
                break;
            }
        } else {
            $senderName = $this->defaultMailerName;
            $senderEmail = $from;
        }

        $replyTo = $message->getReplyTo(); // Pass it to headers
        if (is_array($replyTo)) {
            if (ArrayHelper::isAssociative($from)) {
                $replyTo = array_keys($replyTo);
            }

            $replyTo = implode(';', $replyTo);
        }

        $headers = [];
        if ($replyTo) {
            $headers['X-ReplyTo'] = $replyTo;
        }

        $attachments = $message->getAttachments();
        foreach ($attachments as &$attachment) {
            $attachment['content'] = base64_encode($attachment['content']);
        }

        $embed = $message->getEmbed();
        foreach ($embed as &$embedItem) {
            $embedItem['content'] = base64_encode($embedItem['content']);
        }

        $requestBody = [
            'message' => [
                'body' => [
                    'html' => $message->getHtmlBody(),
                    'plaintext' => $message->getTextBody(),
                ],
                'subject' => $message->getSubject(),
                'from_email' => $senderEmail,
                'from_name' => $senderName,
                'headers' => $headers,
                'recipients' => $email,
                'attachments' => $attachments,
                'inline_attachments' => $embed,
            ],
        ];

        $client = new Client(['baseUrl' => $this->baseUrl]);
        /* @var $response Response */
        $response = $client->createRequest()
            ->setMethod('POST')
            ->setFormat(Client::FORMAT_JSON)
            ->setHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'X-API-KEY' => $this->_apiKey,
            ])
            ->setUrl('email/send.json')
            ->setData($requestBody)
            ->send();

        if($response->isOk and is_array($response->data))
            return $response->data['status'] == 'success' ? true : false;

        return false;
    }
}