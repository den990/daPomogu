# Развертывание на локальной машине

1.  установить docker по инструкции производителя
1.  из консоли перейти в каталог проекта  
1.  скопировать `common/config/.env.example` в `common/config/.env`
и заполнить все необходимые переменные
1.  запустить команду `docker compose up -d`  
1.  подключиться к консоли контейнера с приложением и перейти в каталог `/app`
1.  выполнить команду `composer install/update`  
    *если composer выдает ошибку timeout, то попробовать выполнить
    последовательно команды:*  
    `composer config --global process-timeout 2000`  
    `composer install/update --prefer-dist`
1.  выполнить команду `php init --env=development`    
1.  выполнить команду `php yii migrate`    

# Развертывание на хостинге
Реализован скрипт автоматического развертывания - `.gitlab-ci.yml`  
**Для product развертивания в соответствующий job `.gitlab-ci.yml` добавить команду `sed` для замены переменных mysql в файле
`docker-compose.yml` на переменные из CI окружения. Пример команды - `sed -i -e 's/verysecret/$MYSQL_ROOT_PWD/g' docker-compose.yml`**

# Настройка SSL
Чтобы сервер обрабатывал https, нужно в `Dockerfile` добавить строки:  
```
RUN sed -i -e 's|/var/www/html|/app|g' /etc/apache2/sites-available/default-ssl.conf
RUN sed -i -e 's|/etc/ssl/certs/ssl-cert-snakeoil.pem|/app/ssl/ssl.pem|g' /etc/apache2/sites-available/default-ssl.conf
RUN sed -i -e 's|/etc/ssl/private/ssl-cert-snakeoil.key|/app/ssl/ssl.key|g' /etc/apache2/sites-available/default-ssl.conf
RUN a2enmod ssl
RUN a2ensite default-ssl
```

Создать в корне проекта каталог `ssl` и добавить туда сертификат(`ssl.pem`) и ключ(`ssl.key`)  

В файл `docker-compose.yml` добавить порт `20443:443` для контейнера `app`  

Т.к. на локальной машине поддержка HTTPS в принципе не нужна, то следует разбить файлы
`Dockerfile` и `docker-compose.yml` на локальные и серверные. Для локальных имя оставить
как есть, а для серверов указать соответствующее имя.  
В файлы серверов добавить описанные выше настройки (+ в секциях `build` соответствующих
compose файлов указать серверные `Dockerfile`) и поправить `.gitlab-ci.yml` так, чтобы
на серверах запускались правильные compose файлы и загружались SSL сертификат и ключ

**Еще, как вариант**, в проекте создать файл конфигурации apache и этот файл копировать в 
`Dockerfile` на место `000-default.conf`.  
В самом файле конфигурации сразу прописать все нужные настройки, как для порта 80, так и для 443
вместе с перенаправлением http в https

# Каталоги
1. `api` - приложение для JSON API
1. `frontend` - приложение для клиентов
1. `backend` - приложение для администраторов


# Swagger
Для описания методов JSON API используется Swagger  
Описание нужно заносить в файл `openapi.yaml` в соответствии со спецификацией [https://swagger.io/specification](https://swagger.io/specification)  
Пример оформления спецификации и редактор - https://editor.swagger.io/  
Графический интерфейс для документации представлен на странице [http://localhost:20080/api/site/api-doc](http://localhost:20080/api/site/api-doc)  
Для вывода документации в графическом виде используется [UNPKG](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/installation.md#unpkg)  
**Доступ к Swagger UI не закрыт авторизацией, так что в реальном проекте нужно ее добавить**



# Загрузка файлов
Реализовано два варианта загрузки файлов:  
1.  В локальное хранилище
1.  В S3 совместимое хранилище Yandex Object Storage

Использование Yandex Object Storage наиболее предпочтительный вариант

Базовая форма загрукзи одного файла - `common/models/forms/FileUploader.php`  
через которую происходит загрузка файлов на хост.  

В клиентском коде создается отдельная форма загрузки файла, где прописываются  
все необходимые валидации и внутри этой формы вызывается `common/models/forms/FileUploader.php`  
примеры - `frontend/models/forms/StorageFileUploadForm.php` и `frontend/models/forms/S3FileUploadForm.php`


# Перевод сообщений

Сообщения хранятся в `common/messages`  
  
Не обработанные сообщения записываются в каталог `console/runtime` в файл с именем
`<category>_missed_messages.php` в формате php массива, где `<category>` - имя категории
для которой пропущено сообщение.  
  
Сообщения из файла `<category>_missed_messages.php` надо скопировать в файлы соответствующих переводов
в каталоге `common/messages`  
  
Для автоматизированного перевода новых сообщений нужно запустить команды:  
- `yii i18n/translate-to-russian` - перевод на русский 
> перевод осуществляется через Yandex Translate, поэтому надо убедиться, что указан ключ
в файле `common/config/secret`  
> по умолчанию команды выполняют перевод категории `app`, если нужна другая, то к командам нужно
добавить параметр, указывающй на категрию - `yii i18n/translate-to-russian <category>`


# API
Приложение api отвечает за работе по JSON API, это приложение разбито на части:  
1.  **backend** - Клиентское API для backend. Используется для взаимодествия с клиентскими приложенями,  
    например Angular
1.  **frontend** - Клиентское API для frontend. Используется для взаимодествия с клиентскими приложенями,  
    например Angular
1.  **host** - Межхостовое API. Используется для взаимоедейтствия с другими серверными приложениями



# Тестирование
Документация по тестированию:
1.  [Codeception for Yii Framefork](https://codeception.com/for/yii)

Команды упрвления codeception:  
1.  `vendor\bin\codecept build` - запускает построение акторов по всем приложениям  
1.  `vendor\bin\codecept build -- -c <frontend>` - запускает построение акторов для конкретного приложения,  
    где `<frontend>` - здесь и далее наименование приложения, чей конифиг будет использован
1.  `vendor\bin\codecept run` - запуск всех тестов по всем приложениям
### API тестирование
Используются для тестирования API методов  
Документация по написанию API тестов:  
1.  [API Testing](https://codeception.com/docs/APITesting)

Команды управления codeception для API тестов:  
1.  `vendor\bin\codecept run api -- -c api` - запускает API тесты
1.  `vendor\bin\codecept run api --debug -- -c api` - запускает API тесты  
    с выводом подробной информации
1.  `vendor\bin\codecept generate:cest api <host/v1/SiteIndex> -- -c api` - геренация нового файла  
    API теста, где `<host/v1/SiteIndex>` - название теста с указанием пути расположения
### Приемочные тесты
Используются для комплексного тестирования страниц, включая работу JS  
Документация по написанию приемочных тестов:  
1.  [Acceptance Tests](https://codeception.com/docs/AcceptanceTests)

Команды управления codeception для приемочных тестов:  
1.  `vendor\bin\codecept run acceptance -- -c frontend` - запускает приемочные тесты приложения frontend
1.  `vendor\bin\codecept run acceptance --debug -- -c frontend` - запускает приемочные тесты приложения frontend  
    с выводом подробной информации
1.  `vendor\bin\codecept generate:cest acceptance <SiteIndex> -- -c frontend` - геренация нового файла  
    приемочного теста приложения frontend, где `<SiteIndex>` - название теста

На локальном хостинге требуется запустить Selenium Server, для этого выполнить следующие шаги:  
1.  установить браузер Chrome
1.  установить NPM
1.  установить Java JRE версии не менее 8
1.  установить пакет npm selenium-standalone (https://www.npmjs.com/package/selenium-standalone) по алгоритму:
    1.  создать отдельный каталог для локальной установки и перейти в него
    1.  выполнить команду `npm install selenium-standalone`
    1.  выполнить команду `npx selenium-standalone install --singleDriverInstall=chrome`
1. для запуска использовать команду `npx selenium-standalone start --singleDriverStart=chrome`    
    


# Адаптация под мобильный интерфейс
Для адаптации под мобильный интерфейс необходимо в конфигурации приложения  
объявить компонент `common/components/MobileDetect.php` и добавить его в bootstrap:  
```
    'bootstrap' => ['mobileDetect'],
    'components' => [
        'mobileDetect' => [
            'class' => 'common\components\MobileDetect',
        ],
    ],
```      
Теперь при загрузке страницы с мобильного или планшета, приложение будет искать view запрошенного  
экшена сначала в `@app/templates/mobile`, и если там нет, то в `@app/views`.  
По умолчанию путь view для мобильной и планшетной платформ находится по адресу  `@app/templates/mobile`,  
это можно изменить, задав свойства компонента `mobileDetect` `templatesForMobile` и `templatesForTable`  

> Контроллеры и модели для платформ не меняются, меняется только представление. Алгоритм работы страницы  
должен оставаться тем же.

Пример реализации под мобильный интерфейс реализован в приложении frontend. Если открыть страницу /site/index  
на ПК и мобилке, то представления будут отличаться.

