import { Application } from "express";
import { MockService } from "./services/mock.service";
import { FileService } from "./services/file.service";
import { OpenAPIObject } from "./models/open-api-object";
import { PathsObject } from "./models/paths-object";

export class App {

    private app: Application;
    private mockService: MockService = new MockService();
    private fileService: FileService = new FileService();

    constructor(app: Application) {
        this.app = app;
        this.loadFile('/Users/kklimczak/workspace/mocker/src/example.yml');
    }

    loadFile(path: string) {
        this.fileService.getOpenAPIFile('/Users/kklimczak/workspace/mocker/src/example.yml')
        .subscribe(
            openAPIObject => this.initialize(openAPIObject),
            error => console.log(error)
        );
    }

    initialize(openAPIObject: OpenAPIObject) {
        this.preparePaths(openAPIObject.paths);
    }

    private preparePaths(paths: PathsObject) {
        Object.keys(paths)
        .forEach((path) => {
            const pathItem = paths[path];
            console.log(`GET => ${path}`)

            if (pathItem.get) {
                this.app.get(this.mockService.parseParamsInPath(path), this.mockService.mockGetEndpoint(path, pathItem.get));
            }
        })
    }
}