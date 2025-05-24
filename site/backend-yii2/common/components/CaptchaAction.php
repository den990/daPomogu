<?php


namespace common\components;


class CaptchaAction extends \yii\captcha\CaptchaAction
{
    public $width = 150;
    public $height = 70;
    public $offset = 2;
    public $minLength = 5;
    public $maxLength = 5;


    protected function generateVerifyCode()
    {
        if ($this->minLength > $this->maxLength) {
            $this->maxLength = $this->minLength;
        }
        if ($this->minLength < 3) {
            $this->minLength = 3;
        }
        if ($this->maxLength > 20) {
            $this->maxLength = 20;
        }

        $length = random_int($this->minLength, $this->maxLength);

        $letters = 'bcdfghkmnpqstvwxyz358';
        $vowels = 'aeiou';
        $code = '';
        for ($i = 0; $i < $length; ++$i) {
            if ($i % 2 && random_int(0, 10) > 2 || !($i % 2) && random_int(0, 10) > 9) {
                $code .= $vowels[random_int(0, 4)];
            } else {
                $code .= $letters[random_int(0, 20)];
            }
        }

        return $code;
    }
}