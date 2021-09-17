import { BreweryService } from '../../../../../src/business/services/brewery/BreweryService';
import { BreweryPipelineMock } from '../../../_lib/BreweryPipelineMock';
import { HttpClientMock } from '../../../_lib/HttpClientMock';
import { LoggerMock } from '../../../_lib/LoggerMock';

describe('Services > BreweryService', () => {
  const breweriesEndpoint = 'https://api.openbrewerydb.org/breweries';
  let breweryPipelineMock = new BreweryPipelineMock();
  let httpClientMock = new HttpClientMock();
  let loggerMock = new LoggerMock();

  beforeEach(() => {
    breweryPipelineMock.registerMockFn.mockClear();
    breweryPipelineMock.invokeMockFn.mockClear();
    breweryPipelineMock.describeMockFn.mockClear();
    httpClientMock.getMockFn.mockClear();
    loggerMock.clearAllMockFn();
  });

  // tests should be more granular
  // I'm including this test to cover the service 'happy path' execution
  it('should get the breweries', async () => {
    // Arrange
    const service = new BreweryService(breweriesEndpoint, breweryPipelineMock, httpClientMock, loggerMock);
    const remoteBreweryData = [
      {
        name: 'Remote Brewery Data',
      },
    ];
    const pipelineProcessedBreweryData = [
      {
        name: 'Pipeline Processed Brewery Data',
      },
    ];
    httpClientMock.getMockFn.mockImplementation(() => Promise.resolve(remoteBreweryData));
    breweryPipelineMock.invokeMockFn.mockImplementation(() => {
      return pipelineProcessedBreweryData;
    });

    // Act
    const result = await service.runPipeline();

    // Assert
    expect(httpClientMock.getMockFn).toHaveBeenCalledTimes(1);
    expect(httpClientMock.getMockFn).toHaveBeenCalledWith(breweriesEndpoint);
    expect(breweryPipelineMock.invokeMockFn).toHaveBeenCalledTimes(1);
    expect(breweryPipelineMock.invokeMockFn).toHaveBeenCalledWith(remoteBreweryData);
    expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Running Pipeline`);
    expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Successful Pipeline execution`);
    expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Getting breweries from ${breweriesEndpoint}`);
    expect(loggerMock.errorMockFn).not.toHaveBeenCalledWith(`Pipeline execution failed`);
    expect(result).toEqual(pipelineProcessedBreweryData);
  });

  it('should catch the error when getting remote breweries fails', async () => {
    const service = new BreweryService(breweriesEndpoint, breweryPipelineMock, httpClientMock, loggerMock);
    httpClientMock.getMockFn.mockImplementation(() => Promise.reject('error'));

    try {
      // Act
      await service.runPipeline();
    } catch (err) {
      // Assert
      expect(httpClientMock.getMockFn).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getMockFn).toHaveBeenCalledWith(breweriesEndpoint);
      expect(breweryPipelineMock.invokeMockFn).not.toHaveBeenCalled();
      expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Running Pipeline`);
      expect(loggerMock.infoMockFn).not.toHaveBeenCalledWith(`Successful Pipeline execution`);
      expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Getting breweries from ${breweriesEndpoint}`);
      expect(loggerMock.errorMockFn).toHaveBeenCalledWith(`Pipeline execution failed`);
    }
  });

  it('should catch the error when getting remote breweries fails', async () => {
    const service = new BreweryService(breweriesEndpoint, breweryPipelineMock, httpClientMock, loggerMock);

    const remoteBreweryData = [
      {
        name: 'Remote Brewery Data',
      },
    ];

    httpClientMock.getMockFn.mockImplementation(() => Promise.resolve(remoteBreweryData));
    breweryPipelineMock.invokeMockFn.mockImplementation(() => {
      throw new Error('error');
    });

    try {
      // Act
      await service.runPipeline();
    } catch (err) {
      // Assert
      expect(httpClientMock.getMockFn).toHaveBeenCalledWith(breweriesEndpoint);
      expect(breweryPipelineMock.invokeMockFn).toHaveBeenCalledTimes(1);
      expect(breweryPipelineMock.invokeMockFn).toHaveBeenCalledWith(remoteBreweryData);
      expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Running Pipeline`);
      expect(loggerMock.infoMockFn).not.toHaveBeenCalledWith(`Successful Pipeline execution`);
      expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Getting breweries from ${breweriesEndpoint}`);
      expect(loggerMock.errorMockFn).toHaveBeenCalledWith(`Pipeline execution failed`);
    }
  });
});
