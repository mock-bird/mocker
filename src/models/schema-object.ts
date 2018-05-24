export interface SchemaObject {
    nullable?: boolean;
    discriminator?: object; // TODO add missing model
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: object; // TODO add missing model
    externalDocs?: object; // TODO add missing model
    example?: any;
    deprecated?: boolean;
    title?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    enum?: any[];

    items?: SchemaObject;
    properties?: {[propertyName: string]: SchemaObject};
    additionalProperties?: boolean | SchemaObject;
    type?: string;
    allOf?: SchemaObject[];
    anyOf?: SchemaObject[];
    oneOf?: SchemaObject[];
    not?: SchemaObject;
    description?: string;
    default?: any;
    format?: string;
}