import { MediaTypeObject } from "./media-type-object";

export interface ResponseObject {
    description: string;
    headers: {[headerName: string]: object};
    content: {[mediaType: string]: MediaTypeObject};
    links: {[link: string]: object};
}