import { ParameterObject } from "./parameter-object";
import { RequestBodyObject } from "./request-body-object";
import { ResponsesObject } from "./responses-object";

export interface OperationObject {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: object;
    operationId?: string;
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses?: ResponsesObject;
    callbacks?: object;
    deprecated?: boolean;
    security?: object[];
    servers?: object[];
}