import * as express from 'express';

import BreweriesController from '../../../../../src/app/controllers/api/BreweriesController';
import { IBreweryService } from '../../../../../src/business/services/brewery/IBreweryService';
import { BreweryServiceMock } from '../../../_lib/BreweryServiceMock';

const mockBreweryRunPipelineFn = jest.fn();
const mockMockExpressResponseJsonFn = jest.fn();
const mockExpressNextFn = jest.fn();

describe('API > Controllers > BreweriesController ', () => {
  let breweryServiceMock: IBreweryService;

  beforeEach(() => {
    mockBreweryRunPipelineFn.mockClear();
    mockMockExpressResponseJsonFn.mockClear();
    mockExpressNextFn.mockClear();
    breweryServiceMock = new BreweryServiceMock(mockBreweryRunPipelineFn);
  });

  it('should be able to call new() on BreweriesController ', () => {
    // Act
    const controller = new BreweriesController(breweryServiceMock);

    // Assert
    expect(controller).toBeTruthy();
  });

  it('should call the BreweryService to run the pipeline', async () => {
    // Arrange
    const controller = new BreweriesController(breweryServiceMock);
    const breweryData = [{ obdb_id: 'bnaf-llc-austin' }];
    mockMockExpressResponseJsonFn.mockImplementation(() => Promise.resolve(breweryData));

    const request = {} as unknown as express.Request;
    const response = { json: mockMockExpressResponseJsonFn } as unknown as express.Response;
    const nextFunction = (() => {}) as unknown as express.NextFunction;

    // Act
    const result = await controller.getBreweries(request, response, nextFunction);

    // Assert
    expect(mockBreweryRunPipelineFn).toHaveBeenCalledTimes(1);
    expect(mockMockExpressResponseJsonFn).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject(breweryData);
  });

  it('should forward the error when it fails', async () => {
    const breweryError = new Error('BreweryError');
    mockBreweryRunPipelineFn.mockImplementation(() => {
      throw breweryError;
    });

    // Arrange
    const controller = new BreweriesController(breweryServiceMock);
    const request = {} as unknown as express.Request;
    const response = { json: mockMockExpressResponseJsonFn } as unknown as express.Response;
    const nextFunction = mockExpressNextFn as unknown as express.NextFunction;

    // Act
    await controller.getBreweries(request, response, nextFunction);

    // Assert
    expect(mockBreweryRunPipelineFn).toHaveBeenCalledTimes(1);
    expect(mockMockExpressResponseJsonFn).not.toHaveBeenCalled();
    expect(mockExpressNextFn).toHaveBeenCalled();
    expect(mockExpressNextFn).toHaveBeenCalledWith(breweryError);
  });
});
