<?php


namespace api\components;


class ApiResponse
{
    public $data;
    public $pagination;
    public $error;
    public $success;

    public function __construct($data, $pagination, $error)
    {
        $this->data = $data;
        $this->pagination = $pagination;
        $this->error = $error;
        $this->success = $error == null;
    }

    public static function success($data=null, $pagination = null)
    {
        return new ApiResponse($data, $pagination, null);
    }

    public static function ok()
    {
        return new ApiResponse(null, null, null);
    }

    public static function error($code, $name, $message, $status = null)
    {
        return new ApiResponse(null, null, new Error($code, $name, $message, $status));
    }
}