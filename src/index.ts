import * as express from 'express';
import { OpenAPIObject } from './models/open-api-object';

const app: express.Application = require('express')();

const openAPIObject: OpenAPIObject = {
    openapi: '3.0.1',
    info: {
        title: 'open api test',
        version: '0.0.1'
    },
    paths: {
        '/': {
            get: {
                 description: 'Root endpoint to fetch api version'
            }
        },
        '/paths': {
            get: {},
            post: {}
        }
    }
}

Object.keys(openAPIObject.paths).forEach((path: string) => {
    const pathItem = openAPIObject.paths[path];

    if (pathItem.get) {
        console.log(`GET => ${path}`)
        app.get(path, (req, res) => {
            res.json(pathItem);
        })
    }

    if (pathItem.post) {
        console.log(`POST => ${path}`)
    }
})

app.listen(8080, () => {
    console.log(`Mock of '${openAPIObject.info.title}:${openAPIObject.info.version}' started on port 8080`);
});