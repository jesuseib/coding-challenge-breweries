import { BreweryPipelineBuilder } from '../business/services/brewery/BreweryPipelineBuilder';
import { BreweryService } from '../business/services/brewery/BreweryService';
import Locals from '../inf/providers/Locals';
import { HttpClient } from '../utils/http/HttpClient';
import { IHttpClient } from '../utils/http/IHttpClient';
import { MockedBreweriesResponse } from '../utils/http/MockedBreweriesResponse';
import { MockedHttpClient } from '../utils/http/MockedHttpClient';
import Logger from '../utils/logger/Logger';
import BreweriesController from './controllers/api/BreweriesController';

// Dependency Resolver: it's basically a builder
// TODO: implement it with an 'actual' dependency injection
export class DependencyResolver {
  /**
   * Instantiates the Brewery Controller
   */
  static getBreweryController(): BreweriesController {

    const config = Locals.config()
    
    // build pipeline to process ETL operations
    const pipeline = config.useLoggingPipeline
      ? BreweryPipelineBuilder.buildWithLogger('Brewery Pipeline (logging)')
      : BreweryPipelineBuilder.build('Brewery Pipeline');

    // create the http client to call the breweries endpoint
    const httpClient: IHttpClient = config.useMockBreweryCall
      ? new MockedHttpClient(MockedBreweriesResponse)
      : new HttpClient();

    // handle the logic to get the brewery data thru HTTP and transform the data using the ETL pipeline
    const breweryService = new BreweryService(config.breweriesEndpoint, pipeline, httpClient, Logger);

    // initialize the brewery controller
    const breweryController = new BreweriesController(breweryService);

    // outputs the structure of the pipeline
    Logger.info(`Building Brewery Pipeline: \t` + pipeline.describe());

    return breweryController;
  }
}
