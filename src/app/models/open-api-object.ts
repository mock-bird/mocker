import { InfoObject } from "./info-object";
import { PathsObject } from "./paths-object";
import { ComponentsObject } from "./components-object";

export interface OpenAPIObject {
    openapi: string;
    info: InfoObject;
    servers?: object[];
    paths: PathsObject;
    components?: ComponentsObject;
    security?: object[];
    tags?: object[];
    externalDocs?: object;

}