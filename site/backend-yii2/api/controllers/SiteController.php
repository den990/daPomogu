<?php

namespace api\controllers;

use backend\models\forms\LoginForm;
use Yii;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;

/**
 * Site controller
 */
class SiteController extends Controller
{
    public function behaviors()
    {
        $behaviors =  parent::behaviors();

        $behaviors[] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
            ],
        ];

        return $behaviors;
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionOpenapi()
    {
        return Yii::$app->response->sendFile(Yii::getAlias('@api/../openapi.yaml'));
    }

    public function actionApiDoc()
    {
        $this->layout = false;
        Yii::$app->response->format = Response::FORMAT_HTML;

        return $this->renderContent('<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta
    name="description"
    content="SwaggerUI"
  />
  <title>SwaggerUI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: \'/api/site/openapi\',
      dom_id: \'#swagger-ui\',
    });
  };
</script>
</body>
</html>');
    }
}
