export interface PathItemObject {
    $ref?: string;
    summary?: string;
    description?: string;
    get: object;
    put: object;
    post: object;
    delete: object;
    options: object;
    head: object;
    patch: object;
    trace: object;
    servers: object[];
    parameters: object;
}