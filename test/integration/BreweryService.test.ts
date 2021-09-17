// import { BreweryService } from '../../../../../src/business/services/brewery/BreweryService';
// import { BreweryPipelineMock } from '../../../_lib/BreweryPipelineMock';
// import { HttpClientMock } from '../../../_lib/HttpClientMock';
// import { LoggerMock } from '../../../_lib/LoggerMock';

import { BreweryService } from '../../src/business/services/brewery/BreweryService';
import { BreweryPipelineBuilder } from '../../src/business/services/brewery/BreweryPipelineBuilder';
import { MockedBreweriesResponse } from '../../src/utils/http/MockedBreweriesResponse';
import { MockedHttpClient } from '../../src/utils/http/MockedHttpClient';
import { IHttpClient } from '../../src/utils/http/IHttpClient';
import { LoggerMock } from '../unit/_lib/LoggerMock';

const expectedData = [
  {
    state: 'Colorado',
    breweries: [
      {
        id: 9180,
        obdbId: 'boulder-beer-co-boulder',
        name: 'Boulder Beer Co',
        breweryType: 'regional',
        street: '2880 Wilderness Pl',
        city: 'Boulder',
        state: 'Colorado',
        postalCode: '80301-5401',
        country: 'United States',
        longitude: '-105.2480158',
        latitude: '40.026439',
        updatedAt: '2018-08-24T00:00:00.000Z',
        createdAt: '2018-07-24T00:00:00.000Z',
        region: 'West',
      },
    ],
  },
  {
    state: 'Pennsylvania',
    breweries: [
      {
        id: 11039,
        obdbId: 'goose-island-philadelphia-philadelphia',
        name: 'Goose Island Philadelphia',
        breweryType: 'brewpub',
        street: '1002 Canal St',
        city: 'Philadelphia',
        state: 'Pennsylvania',
        postalCode: '19123',
        country: 'United States',
        longitude: '-75.13506341',
        latitude: '39.9648491',
        updatedAt: '2018-08-24T00:00:00.000Z',
        createdAt: '2018-07-24T00:00:00.000Z',
        region: 'Northeast',
      },
    ],
  },
  {
    state: 'Michigan',
    breweries: [
      {
        id: 11767,
        obdbId: 'ironbark-brewery-jackson',
        name: 'Ironbark Brewery',
        breweryType: 'micro',
        street: '2610 Kibby Rd',
        city: 'Jackson',
        state: 'Michigan',
        postalCode: '49203-4908',
        country: 'United States',
        longitude: '-84.43762976',
        latitude: '42.2188971',
        phone: '5177487988',
        updatedAt: '2018-08-24T00:00:00.000Z',
        createdAt: '2018-07-24T00:00:00.000Z',
        region: 'Midwest',
      },
    ],
  },
];

describe('Services > Integration BreweryService', () => {
  const breweriesEndpoint = 'https://api.openbrewerydb.org/breweries';

  // build pipeline to process ETL operations
  const pipeline = BreweryPipelineBuilder.build('Brewery Pipeline');

  // create the http client to call the breweries endpoint
  const httpClient: IHttpClient = new MockedHttpClient(MockedBreweriesResponse);

  let loggerMock = new LoggerMock();

  it('should get and process the breweries data', async () => {
    // Arrange
    const breweryService = new BreweryService(breweriesEndpoint, pipeline, httpClient, loggerMock);

    // Act
    const result = await breweryService.runPipeline();

    // Assert
    expect(result).toEqual(expectedData);
  });
});
