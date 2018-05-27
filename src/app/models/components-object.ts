import { SchemaObject } from "./schema-object";
import { ResponseObject } from "./response-object";
import { ParameterObject } from "./parameter-object";

export interface ComponentsObject {
    schemas?: {[schema: string]: SchemaObject};
    responses?: {[response: string]: ResponseObject};
    parameters?: {[parameter: string]: ParameterObject};
    // TODO add missing properties
}