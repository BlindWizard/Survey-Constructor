#!/usr/bin/env node
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerParser = require('swagger-parser');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDefinition = {
    openapi: "3.0.0",
    servers: [{
        url: "http://dev.polls",
        description: "Development"
    }],
    info: {
        title: "Survey Box",
        description: "Surveys and polls!",
        contact: {
            name: "Administration",
            email: "admin@surveybox.com"
        },
        license: {
            name: "proprietary",
        },
        version: "1.0.0"
    },
};

const options = {
    swaggerDefinition,
    apis: ['./resources/js/admin/api/*.api.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

swaggerParser.bundle(
    swaggerSpec,
    {strictValidation: true, validateSchema: true},
    (err, api) => {
        if (err) {
            throw new Error(err);
        }

        fs.writeFileSync('./docs/admin/swagger.yml', yaml.dump(api));
    }
);
