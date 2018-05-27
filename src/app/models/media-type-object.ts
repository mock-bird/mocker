import { SchemaObject } from "./schema-object";

export interface MediaTypeObject {
    schema?: SchemaObject;
    example?: any;
    examples?: {[example: string]: object};
    encoding?: {[encoding: string]: object};
}