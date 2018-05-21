import { InfoObject } from "./info-object";
import { PathsObject } from "./paths-object";

export interface OpenAPIObject {
    openapi: string;
    info: InfoObject;
    servers?: object[];
    paths: PathsObject;
    components?: object;
    security?: object[];
    tags?: object[];
    externalDocs?: object;

}