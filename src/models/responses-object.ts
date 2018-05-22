export interface ResponsesObject {
    default?: object;
    [statusCode: string]: object | any;
}