FROM yiisoftware/yii2-php:8.1-apache

RUN mkdir /appstorage
RUN chmod -R ugo+rwx /appstorage

WORKDIR /app

# Change document root for Apache
RUN sed -i -e 's|/app/web|/app/|g' /etc/apache2/sites-available/000-default.conf