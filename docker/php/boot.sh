#!/bin/bash

cd /www/polls || { echo "App directory doesn't exist"; exit 1; }

composer install --no-suggest
php artisan migrate --force

wait

chmod -R 777 /www/polls/storage
chmod -R 777 /www/polls/bootstrap/cache

php-fpm7.4 --nodaemonize
