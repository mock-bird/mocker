import { PathItemObject } from "../models/path-item-object";
import {Request, Response} from 'express';
import { OperationObject } from "../models/operation-object";

export class MockService {

    constructor() {
    }

    mockGetEndpoint(path: string, getOperation: OperationObject) {
        return (req: Request, res: Response) => {
            res.json(this.prepareGetResponse(getOperation));
        }
    }

    parseParamsInPath(path: string): string {
        return path.replace(/{/g, ':').replace(/}/g, '');
    }

    prepareGetResponse(operationObject: OperationObject): any {
        const status = Object.keys(operationObject.responses)[0];
        const schema = operationObject.responses[status].content['application/json'].schema;

        let response: any = {};

        Object.keys(schema.properties).forEach(key => {
            if (schema.required.includes(key)) {
                switch(schema.properties[key].type) {
                    case 'integer': {
                        response[key] = 3;
                        break;
                    }
                    case 'string': {
                        response[key] = 'testString';
                        break;
                    }
                }
            }
        });

        return response;
    }

}