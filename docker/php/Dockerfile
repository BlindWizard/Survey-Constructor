FROM ubuntu:18.04

WORKDIR /www/polls

RUN apt-get update -y
RUN apt-get install -y software-properties-common

RUN LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php

RUN apt-get update -y

RUN apt-get install -y php7.4-fpm \
&& apt-get install -y php7.4-mbstring \
&& apt-get install -y php7.4-dom \
&& apt-get install -y php7.4-zip \
&& apt-get install -y php7.4-json \
&& apt-get install -y php7.4-curl \
&& apt-get install -y php7.4-amqp \
&& apt-get install -y php7.4-intl \
&& apt-get install -y php7.4-igbinary \
&& apt-get install -y php7.4-redis \
&& apt-get install -y php7.4-pgsql \
&& apt-get install -y php-pear \
&& apt-get install -y php7.4-dev \
&& apt-get install -y php7.4-xdebug

RUN pecl install redis-5.0.2

RUN mkdir /run/php \
&& mkdir /var/log/php

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

EXPOSE 9000