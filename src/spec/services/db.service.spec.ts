import {DbService} from "../../app/services/db.service";
import {OpenAPIObject} from "../../app/models/open-api-object";
import {FileService} from "../../app/services/file.service";
import 'mocha';
import {expect} from 'chai';
import {ComponentsService} from "../../app/services/components.service";

describe('DbService', () => {

    const fileService: FileService = new FileService();
    const componentsService: ComponentsService = new ComponentsService();
    let dbService: DbService;
    let apiObject: OpenAPIObject;

    beforeEach(() => {
        dbService = new DbService(componentsService);
        apiObject = fileService.getOpenAPIFileSync('/Users/kklimczak/workspace/mocker/example.yml');
        if (apiObject.components) {
            componentsService.registerComponents(apiObject.components);
        }
    });

    it('should create map with paths and schemas', () => {
        dbService.assignSchemaToPaths(apiObject.paths);
        expect(dbService.pathsSchema.size).to.be.equals(1);
    });

});
