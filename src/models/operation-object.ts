import { ParameterObject } from "./parameter-object";
import { RequestBodyObject } from "./request-body-object";

export interface OperationObject {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: object;
    operationId?: string;
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses?: object;
    callbacks?: object;
    deprecated?: boolean;
    security?: object[];
    servers?: object[];
}