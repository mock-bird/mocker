import { ResponseObject } from "./response-object";

export interface ResponsesObject {
    default?: ResponseObject;
    [statusCode: string]: ResponseObject | any;
}