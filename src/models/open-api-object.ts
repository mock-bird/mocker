import { InfoObject } from "./info-object";

export interface OpenAPIObject {
    openapi: string;
    info: InfoObject;
    servers?: object[];
    paths: object;
    components?: object;
    security?: object[];
    tags?: object[];
    externalDocs?: object;

}