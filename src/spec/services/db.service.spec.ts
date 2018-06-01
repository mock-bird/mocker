import {expect} from 'chai';
import 'mocha';
import {OpenAPIObject} from "../../app/models/open-api-object";
import {ComponentsService} from "../../app/services/components.service";
import {DbService} from "../../app/services/db.service";
import {FileService} from "../../app/services/file.service";

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

    it('createEntitiesBasedOnPaths() should create entities in map', () => {
        dbService.createEntitiesBasedOnPaths(apiObject.paths);
        const response = dbService.getResponse('/pets', {});
        expect(response).to.be.lengthOf(2);
    });

});
