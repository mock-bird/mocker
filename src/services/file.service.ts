import {readFile} from 'fs';
import { OpenAPIObject } from "../models/open-api-object";
import { parse } from 'yamljs';
import { Observable, Observer } from 'rxjs';

export class FileService {
    constructor() {}

    getOpenAPIFile(path: string): Observable<OpenAPIObject> {
        return Observable.create((observer: Observer<OpenAPIObject>) => {
            readFile(path, (err, data: Buffer) => {
                if (err) {
                    observer.error(err);
                }

                observer.next(parse(data.toString()));
                observer.complete();
            })
        })
    }
}