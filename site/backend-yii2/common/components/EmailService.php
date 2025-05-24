<?php

namespace common\components;

use Yii;
use yii\base\Component;

class EmailService extends Component
{
    public function sendRegistrationVolunteerEmail($user)
    {
        return Yii::$app->mailer->compose('registration-volunteer', ['user' => $user])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($user->email)
            ->setSubject('Регистрация на платформе')
            ->send();
    }

    public function sendRegistrationOrganizationEmail($organization)
    {
        return Yii::$app->mailer->compose('registration-organization', ['organization' => $organization])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($organization->email)
            ->setSubject('Регистрация на платформе')
            ->send();
    }

    public function sendOrganizationRegistationAccepted($organization, $password)
    {
        return Yii::$app->mailer->compose('registration-organization-accepted', ['organization' => $organization, 'password' => $password])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($organization->email)
            ->setSubject('Ваш запрос на регистрацию принят')
            ->send();
    }

    public function sendOrganizationRegistationRejected($organization)
    {
        return Yii::$app->mailer->compose('registration-organization-reject', ['organization' => $organization])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($organization->email)
            ->setSubject('Ваш запрос на регистрацию отклонен')
            ->send();
    }


    public function sendOrganizationAttachmentAccepted($user, $organization)
    {
        return Yii::$app->mailer->compose('organization-attachment-accepted', ['user' => $user, 'organization' => $organization])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($user->email)
            ->setSubject('Ваша заявка на прикрепление принята')
            ->send();
    }

    public function sendOrganizationAttachmentReject($user, $organization)
    {
        return Yii::$app->mailer->compose('organization-attachment-reject', ['user' => $user, 'organization' => $organization])
            ->setFrom(['koldyrev03@gmail.com' => 'Dapomogu'])
            ->setTo($user->email)
            ->setSubject('Ваша заявка на прикрепление отклонена')
            ->send();
    }
}
