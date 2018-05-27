import 'mocha';
import { expect } from 'chai';
import { MockService } from '../../app/services/mock.service';
import { OperationObject } from '../../app/models/operation-object';
import { FileService } from '../../app/services/file.service';
import { OpenAPIObject } from '../../app/models/open-api-object';

describe('MockService', () => {

    let mockService: MockService;
    let operation: OperationObject;
    let fileService: FileService = new FileService();
    const openAPIObject: OpenAPIObject = fileService.getOpenAPIFileSync('/Users/kklimczak/workspace/mocker/example.yml');

    beforeEach(() => {
        mockService = new MockService();
        operation = openAPIObject.paths['/pets/{petId}'].get as OperationObject;
    })

    it('parseParamsInPath() should replace brackets params to params with colon', () => {
        const path = '/users/{userId}/books/{bookId}';
        const expectedPath = '/users/:userId/books/:bookId'
        expect(mockService.parseParamsInPath(path)).to.equal(expectedPath);
    });

    it('prepareGetResponse() should return get response based on passed operation object', () => {
        const getResponse = mockService.prepareGetResponse(operation);
        expect(getResponse.id).to.not.be.undefined;
        expect(getResponse.id).to.be.a('number');
        expect(getResponse.name).to.not.be.undefined;
        expect(getResponse.name).to.be.a('string');
        if (getResponse.tag) {
            expect(getResponse.tag).to.be.a('string');
        }
    })

});