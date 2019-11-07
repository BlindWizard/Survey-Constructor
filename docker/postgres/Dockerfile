FROM postgres:11.5-alpine

RUN apk add postgresql-contrib

ADD boot.sh /docker-entrypoint-initdb.d/
RUN chmod 0755 /docker-entrypoint-initdb.d/boot.sh
