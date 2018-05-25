import { PathItemObject } from "./models/path-item-object";
import {Request, Response} from 'express';
import { OperationObject } from "./models/operation-object";

export class MockService {

    constructor() {
    }

    mockGetEndpoint(path: string, getOperation: OperationObject) {
        return (req: Request, res: Response) => {
            res.json(getOperation);
        }
    }

    parseParamsInPath(path: string): string {
        return path.replace(/{/g, ':').replace(/}/g, '');
    }

}