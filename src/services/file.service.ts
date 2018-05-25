import { OpenAPIObject } from "../models/open-api-object";

export class FileService {
    constructor() {}

    getOpenAPIFile(path: string): OpenAPIObject {
        return {
            openapi: '3.0.1',
            info: {
                title: 'open api test',
                version: '0.0.1'
            },
            paths: {
                '/{name}': {
                    get: {
                         description: 'Root endpoint to fetch api version',
                        parameters: [
                            {
                                in: 'path',
                                name: 'name'
                            }
                        ]
                    }
                },
                '/paths': {
                    get: {},
                    post: {}
                }
            }
        }
    }
}