import 'mocha';
import { expect } from 'chai';
import { MockService } from '../../app/services/mock.service';
import { OperationObject } from '../../app/models/operation-object';
import { FileService } from '../../app/services/file.service';
import { OpenAPIObject } from '../../app/models/open-api-object';
import { ComponentsService } from '../../app/services/components.service';
import {DbService} from "../../app/services/db.service";

describe('MockService', () => {

    const componentsService: ComponentsService = new ComponentsService();
    const dbService: DbService = new DbService(componentsService);
    const fileService: FileService = new FileService();
    const openAPIObject: OpenAPIObject = fileService
        .getOpenAPIFileSync('/Users/kklimczak/workspace/mocker/example.yml');
    let mockService: MockService;
    let operation: OperationObject;

    beforeEach(() => {
        if (openAPIObject.components) {
            componentsService.registerComponents(openAPIObject.components);
        }
        mockService = new MockService(componentsService, dbService);
        operation = openAPIObject.paths['/pets/{petId}'].get as OperationObject;
    });

    it('parseParamsInPath() should replace brackets params to params with colon', () => {
        const path = '/users/{userId}/books/{bookId}';
        const expectedPath = '/users/:userId/books/:bookId';
        expect(mockService.parseParamsInPath(path)).to.equal(expectedPath);
    });

});
