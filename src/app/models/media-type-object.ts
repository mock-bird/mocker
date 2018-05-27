import { SchemaObject } from "./schema-object";
import { ReferenceObject } from "./reference-object";

export interface MediaTypeObject {
    schema?: SchemaObject | ReferenceObject;
    example?: any;
    examples?: {[example: string]: object};
    encoding?: {[encoding: string]: object};
}