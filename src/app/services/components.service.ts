import { ComponentsObject } from "../models/components-object";
import { SchemaObject } from "../models/schema-object";

export class ComponentsService {

    private components: ComponentsObject = {};

    constructor() {
    }

    registerComponents(components: ComponentsObject) {
        this.components = components;
    }

    resolveComponent(componentReference: string): SchemaObject {
        const splitedReference = componentReference.split('/');

        if (splitedReference[0] === '#' && splitedReference[1] === 'components') {
            switch (splitedReference[2]) {
                case 'schemas': {
                    if (this.components.schemas) {
                        return this.components.schemas[splitedReference[3]];
                    } else {
                        throw new SyntaxError(`Missing reference => schemas/${splitedReference[3]}`)
                    }
                }
            }
        }

        return {};
        
    }

}