<?php

namespace frontend\models\forms;


use common\models\forms\FileUploader;
use yii\base\Model;
use yii\web\UploadedFile;

class S3FileUploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $file;
    public $prefix;

    public function rules()
    {
        return [
            [['file'], 'file', 'skipOnEmpty' => false, 'maxSize' => \common\models\forms\FileUploader::SIZE_5MB,
                'checkExtensionByMimeType' => false, 'extensions' => ['png', 'jpg', 'pdf']],
            ['prefix', 'string', 'max' => 150]
        ];
    }

    public function upload()
    {
        $this->file = UploadedFile::getInstance($this, 'file');
        if(!$this->validate()) return null;

        $fileUploader = new FileUploader();
        $fileUploader->file = $this->file;
        $fileUploader->prefix = $this->prefix;
        return $fileUploader->uploadToS3Storage();
    }
}