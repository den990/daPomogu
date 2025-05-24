<?php

namespace common\models\forms;


use Aws\S3\S3Client;
use common\components\AppCommon;
use common\components\YandexS3;
use common\components\YandexS3Credentials;
use common\models\File;
use Yii;
use yii\base\Model;
use yii\helpers\FileHelper;
use yii\web\UploadedFile;

final class FileUploader extends Model
{
    const SIZE_5MB = 5242880;

    public $prefix;

    private $_key;
    private $_bucket;

    /**
     * @var UploadedFile
     */
    public $file;

    public function rules()
    {
        return [
            [['file'], 'file', 'skipOnEmpty' => false, 'maxSize' => self::SIZE_5MB, 'checkExtensionByMimeType' => false,
                'extensions' => ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'rtf']],
            [['file'], 'file', 'skipOnEmpty' => false,
                'mimeTypes' => [
                    'application/*',
                    'image/*',
                    'text/*',
                ]],
            ['prefix', 'string', 'max' => 150]
        ];
    }

    /**
     * @return File|null
     * @throws \yii\base\Exception
     */
    public function uploadToLocalStorage()
    {
        $fileStorePath = Yii::$app->params['fileStorePath'];

        if(!$this->validate()) return null;

        $this->_key = substr(hash('sha256', Yii::$app->security->generateRandomString()), -8)
            . '_' . time();
        $this->_bucket = "$fileStorePath/" . $this->file->extension . '/'
            . $this->_key . '.' . $this->file->extension;

        if(!file_exists("$fileStorePath/" . $this->file->extension))
            FileHelper::createDirectory("$fileStorePath/" . $this->file->extension);
        if ($this->file->saveAs($this->_bucket)) {
            $model = new File();
            $model->setAttributes([
                'storage' => File::LOCAL_STORAGE,
                'name' => $this->file->baseName,
                'ext' => $this->file->extension,
                'size' => $this->file->size,
                'key' => $this->_key,
                'bucket' => $this->_bucket,
                'date' => date('Y-m-d'),
            ]);
            if($model->save()){
                return $model;
            } else {
                unlink(Yii::getAlias($this->_bucket));
            }
        }

        return null;
    }

    /**
     * @return File|null
     * @throws \Throwable
     * @throws \yii\base\Exception
     */
    public function uploadToS3Storage()
    {
        if(!$this->validate()) return null;

        $this->_key = substr(hash('sha256', Yii::$app->security->generateRandomString()), -8)
            . '_' . time() . '.' . $this->file->extension;
        $this->_bucket = Yii::$app->params['yandexS3BucketName'];

        if($this->prefix)
            $this->_key = $this->prefix . $this->_key;

        $s3 = new S3Client(YandexS3::clientParams());

        try{
            $s3->putObject([
                'SourceFile' => $this->file->tempName,
                'Bucket' => $this->_bucket,
                'Key' => $this->_key,
            ]);

            $model = new File();
            $model->setAttributes([
                'storage' => File::S3_STORAGE,
                'name' => $this->file->baseName,
                'ext' => $this->file->extension,
                'size' => $this->file->size,
                'key' => $this->_key,
                'bucket' => $this->_bucket,
                'date' => date('Y-m-d'),
            ]);
            if($model->save()){
                return $model;
            } else {
                $s3->deleteObject([
                    'Bucket' => $this->_bucket,
                    'Key' => $this->_key,
                ]);
                return null;
            }
        } catch (\Throwable $e){
            throw $e;
        }
    }
}