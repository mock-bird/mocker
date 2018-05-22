import { ParameterObject } from "./parameter-object";

export interface OperationObject {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: object;
    operationId?: string;
    parameters?: ParameterObject[];
    requestBody?: object;
    responses?: object;
    callbacks?: object;
    deprecated?: boolean;
    security?: object[];
    servers?: object[];
}