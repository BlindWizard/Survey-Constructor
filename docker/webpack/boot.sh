#!/bin/bash

cd /www/polls || { echo "App directory doesn't exist"; exit 1; }

npm i --verbose
npm run swagger --verbose

wait

npm run watch-poll --verbose
