FROM ubuntu:18.04

WORKDIR /www/polls

RUN apt-get -y update
RUN apt-get -y install curl

RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get -y install nodejs
RUN apt-get -y install build-essential
RUN nodejs -v
RUN npm -v