import 'mocha';
import { expect } from 'chai';
import { MockService } from '../../app/services/mock.service';
import { OperationObject } from '../../app/models/operation-object';

describe('MockService', () => {

    let mockService: MockService;

    beforeEach(() => {
        mockService = new MockService();
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

const operation: OperationObject = {
    "summary": "Info for a specific pet",
    "operationId": "showPetById",
    "tags": [
        "pets"
    ],
    "parameters": [
        {
            "name": "petId",
            "in": "path",
            "required": true,
            "description": "The id of the pet to retrieve",
            "schema": {
                "type": "string"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "Expected response to a valid request",
            "content": {
                "application/json": {
                    "schema": {
                        "required": [
                            "id",
                            "name"
                        ],
                        "properties": {
                            "id": {
                                "type": "integer",
                                "format": "int64"
                            },
                            "name": {
                                "type": "string"
                            },
                            "tag": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
    }
}