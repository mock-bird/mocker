import 'mocha';
import { expect } from 'chai';
import { MockService } from '../../app/services/mock.service';
import { OperationObject } from '../../app/models/operation-object';
import { FileService } from '../../app/services/file.service';
import { OpenAPIObject } from '../../app/models/open-api-object';
import { ComponentsService } from '../../app/services/components.service';

describe('MockService', () => {

    let mockService: MockService;
    const componentsService: ComponentsService = new ComponentsService();
    let operation: OperationObject;
    let fileService: FileService = new FileService();
    const openAPIObject: OpenAPIObject = fileService.getOpenAPIFileSync('/Users/kklimczak/workspace/mocker/example.yml');

    beforeEach(() => {
        if (openAPIObject.components) {
            componentsService.registerComponents(openAPIObject.components);
        }
        mockService = new MockService(componentsService);
        operation = openAPIObject.paths['/pets/{petId}'].get as OperationObject;
    })

    it('parseParamsInPath() should replace brackets params to params with colon', () => {
        const path = '/users/{userId}/books/{bookId}';
        const expectedPath = '/users/:userId/books/:bookId'
        expect(mockService.parseParamsInPath(path)).to.equal(expectedPath);
    });

    it('prepareGetResponse() should return get response based on passed operation object', () => {
        const getResponse = mockService
            .prepareGetResponse(operation, '/pets/{petId}', { petId: 1 });
        expect(getResponse.id).to.not.be.undefined;
        expect(getResponse.id).to.be.a('number');
        expect(getResponse.name).to.not.be.undefined;
        expect(getResponse.name).to.be.a('string');
        if (getResponse.tag) {
            expect(getResponse.tag).to.be.a('string');
        }
    });

    it('prepareGetResponse() should build response object based on operation object with references', () => {
        const getOperation = mockService
        .prepareGetResponse(openAPIObject.paths['/pets'].get as OperationObject, '/pets', {});

        expect(getOperation).to.be.an('array');
        expect(getOperation).lengthOf.to.greaterThan(0);
    })

});