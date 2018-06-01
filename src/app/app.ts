import {Application} from "express";
import {MockService} from "./services/mock.service";
import {FileService} from "./services/file.service";
import {OpenAPIObject} from "./models/open-api-object";
import {PathsObject} from "./models/paths-object";
import {ComponentsService} from "./services/components.service";
import {DbService} from "./services/db.service";

export class App {

    private app: Application;
    private componentsService: ComponentsService = new ComponentsService();
    private dbService: DbService = new DbService(this.componentsService);
    private mockService: MockService = new MockService(this.componentsService, this.dbService);
    private fileService: FileService = new FileService();

    constructor(app: Application) {
        this.app = app;
        this.loadFile('/Users/kklimczak/workspace/mocker/example.yml');
    }

    private loadFile(path: string) {
        this.fileService.getOpenAPIFile(path)
            .subscribe(
                openAPIObject => this.initialize(openAPIObject),
                error => console.log(error),
            );
    }

    private initialize(openAPIObject: OpenAPIObject) {
        if (openAPIObject.components) {
            this.componentsService.registerComponents(openAPIObject.components);
        }
        this.dbService.createEntitiesBasedOnPaths(openAPIObject.paths);
        this.preparePaths(openAPIObject.paths);
    }

    private preparePaths(paths: PathsObject) {
        Object.keys(paths)
            .forEach((path) => {
                const pathItem = paths[path];

                if (pathItem.get) {
                    this.app.get(
                        this.mockService.parseParamsInPath(path),
                        this.mockService.mockGetEndpoint(path, pathItem.get,
                        ));
                }
            });
    }
}