import { Application } from "express";
import { MockService } from "./mock.service";
import { FileService } from "./services/file.service";

export class App {

    private app: Application;
    private mockService: MockService = new MockService();
    private fileService: FileService = new FileService();

    constructor(app: Application) {
        this.app = app;
        this.initialize();
    }

    initialize() {
        this.preparePaths();
    }

    private preparePaths() {
        const paths = this.fileService.getOpenAPIFile('./').paths;
        Object.keys(paths)
        .forEach((path) => {
            const pathItem = paths[path];

            if (pathItem.get) {
                this.app.get(this.mockService.parseParamsInPath(path), this.mockService.mockGetEndpoint(path, pathItem.get));
            }
        })
    }
}