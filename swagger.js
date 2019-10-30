#!/usr/bin/env node
const swaggerJSDoc = require('swagger-jsdoc');
var fs = require('fs');

const swaggerDefinition = {
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['./resources/js/admin/api/*.api.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync('./docs/swagger.json', JSON.stringify(swaggerSpec));
