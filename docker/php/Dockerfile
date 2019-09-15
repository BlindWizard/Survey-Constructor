FROM ubuntu:18.04

WORKDIR /www/polls

RUN apt-get update -y
RUN apt-get install -y software-properties-common

RUN LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php

RUN apt-get update -y

RUN apt-get install -y php7.3-fpm \
&& apt-get install -y php7.3-mbstring \
&& apt-get install -y php7.3-dom \
&& apt-get install -y php7.3-zip \
&& apt-get install -y php7.3-json \
&& apt-get install -y php7.3-curl \
&& apt-get install -y php7.3-amqp \
&& apt-get install -y php7.3-intl \
&& apt-get install -y php7.3-igbinary \
&& apt-get install -y php7.3-redis \
&& apt-get install -y php7.3-pgsql \
&& apt-get install -y php-pear \
&& apt-get install -y php7.3-dev \
&& apt-get install -y php7.3-xdebug

RUN pecl install redis-5.0.2

RUN mkdir /run/php \
&& mkdir /var/log/php

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

EXPOSE 9000