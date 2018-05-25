import * as express from 'express';
import { OpenAPIObject } from './models/open-api-object';
import {openSync} from 'fs';
import { App } from './app';

const app: express.Application = require('express')();

const mockApp = new App(app);

app.all('/**', (req, res) => {
    res.status(404).json({
        status: 404,
        message: `Path '${req.originalUrl}' not specified in API definition.`
    });
});

app.listen(8080, () => {
    console.log('Mock started on port 8080');
});
