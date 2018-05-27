import { ContactObject } from "./contact-object";
import { LicenseObject } from "./license-object";

export interface InfoObject {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
}