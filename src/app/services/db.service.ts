import {SchemaObject} from "../models/schema-object";
import {ReferenceObject} from "../models/reference-object";
import {ComponentsService} from "./components.service";
import {PathsObject} from "../models/paths-object";
import {OperationObject} from "../models/operation-object";

export class DbService {

    pathsSchema: Map<string, any[]> = new Map();

    constructor(private componentsService: ComponentsService) {

    }

    public getElements(path: string, parameters: any): any {
        const pathParts = path.split('/');
        if (this.isPathParameter(this.getLastElement(pathParts))) {
            const elements = this.pathsSchema.get(pathParts[pathParts.length - 2]);
            return elements && elements.length ? elements
                .find(element => element.id == parameters[this.getParamName(this.getLastElement(pathParts))])
                : {};
        } else {
            return this.pathsSchema.get(pathParts[pathParts.length - 1]);
        }
    }

    public assignSchemaToPaths(paths: PathsObject) {
        Object.keys(paths).forEach(path => {
            if (paths[path].get) {
                const pathParts = path.split('/');
                const get: OperationObject = paths[path].get as OperationObject;
                const schema = this.resolveSchemaOrReference(get.responses[200].content['application/json'].schema);
                if (this.isPathParameter(pathParts[pathParts.length - 1])) {

                } else {
                    if (schema.type === 'array' && schema.items) {
                        if (!this.pathsSchema.has(pathParts[pathParts.length - 1])) {
                            let elements: any[] = [];
                            for (let i = 0; i < 2; i++) {
                                elements = [...elements, this.createSingleEntity(schema.items, i + 1)];
                            }
                            this.pathsSchema.set(pathParts[pathParts.length - 1], elements);
                        }
                    }
                }
            }
        });
    }

    public createSingleEntity(schemaOrReference: SchemaObject | ReferenceObject, id: number): any {
        const schema: SchemaObject = this.resolveSchemaOrReference(schemaOrReference);
        const response: any = {};

        if (schema.properties) {
            Object.keys(schema.properties).forEach(key => {
                if (schema.properties && schema.required && schema.required.includes(key)) {
                    if (key === 'id') {
                        response[key] = id;
                    } else {
                        switch (schema.properties[key].type) {
                            case 'integer': {
                                response[key] = 3;
                                break;
                            }
                            case 'string': {
                                response[key] = id % 2 === 0 ? 'even' : 'odd';
                                break;
                            }
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

    private resolveSchemaOrReference(schemaOrReference: SchemaObject | ReferenceObject): SchemaObject {
        const reference = (schemaOrReference as ReferenceObject).$ref;
        if (reference) {
            return this.componentsService.resolveComponent(reference);
        } else {
            return schemaOrReference as SchemaObject;
        }
    }

    private isPathParameter(pathPart: string): boolean {
        return pathPart.indexOf('{') !== -1;
    }

    private getLastElement(array: any[]) {
        return array[array.length - 1];
    }

    private getParamName(path: string): string {
        return path.replace(/{/g, '').replace(/}/g, '');
    }
}