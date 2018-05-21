import { ContactObject } from "./contact-object";

export interface InfoObject {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: object;
    version: string;
}