import {Request, Response} from 'express';
import {OperationObject} from "../models/operation-object";
import {ComponentsService} from "./components.service";
import {SchemaObject} from "../models/schema-object";
import {ReferenceObject} from "../models/reference-object";
import {DbService} from "./db.service";

export class MockService {

    constructor(private componentsService: ComponentsService, private db: DbService) {
    }

    mockGetEndpoint(path: string, getOperation: OperationObject) {
        return (req: Request, res: Response) => {
            console.log(path);
            res.json(this.prepareGetResponse(getOperation, path, req.params));
        };
    }

    parseParamsInPath(path: string): string {
        return path.replace(/{/g, ':').replace(/}/g, '');
    }

    prepareGetResponse(operationObject: OperationObject, path: string, pathParams: { [key: string]: any }): any {
        const status = Object.keys(operationObject.responses)[0];
        const schema = operationObject.responses[status].content['application/json'].schema;

        return this.db.getElements(path, pathParams);
    }

    private createMockObjectBySchema(schemaObject: SchemaObject | ReferenceObject): any {
        let response: any = {};
        const schema: SchemaObject = this.resolveSchema(schemaObject);

        if (schema.type) {
            switch (schema.type) {
                case 'array': {
                    if (schema.items) {
                        response = [this.createMockObjectBySchema(schema.items)];
                    } else {
                        throw new SyntaxError('If schema has type `array`, property `items` must be exist');
                    }
                    break;
                }
            }
        } else if (schema.properties) {
            Object.keys(schema.properties).forEach(key => {
                if (schema.properties && schema.required && schema.required.includes(key)) {
                    switch (schema.properties[key].type) {
                        case 'integer': {
                            response[key] = 3;
                            break;
                        }
                        case 'string': {
                            response[key] = 'testString';
                            break;
                        }
                    }
                } else {
                    if (Date.now() % 2 === 0) {
                        response[key] = 'tag';
                    }
                }
            });
        }
        return response;
    }

    private resolveSchema(schemaOrReference: SchemaObject | ReferenceObject): SchemaObject {
        return (schemaOrReference as ReferenceObject).$ref
            ? this.componentsService.resolveComponent((schemaOrReference as ReferenceObject).$ref)
            : schemaOrReference as SchemaObject;
    }
}
