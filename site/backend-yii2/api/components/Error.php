<?php


namespace api\components;


class Error
{
    public $code;
    public $name;
    public $message;
    public $status;

    public function __construct($code, $name, $message, $status = null)
    {
        $this->code = $code;
        $this->name = $name;
        $this->message = $message;
        $this->status = $status;
    }
}