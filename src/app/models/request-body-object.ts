import { MediaTypeObject } from "./media-type-object";

export interface RequestBodyObject {
    description?: string;
    content: {[mediaType: string]: MediaTypeObject};
    required?: boolean;
}