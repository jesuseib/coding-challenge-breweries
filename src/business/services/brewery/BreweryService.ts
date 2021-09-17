import { IHttpClient } from '../../../utils/http/IHttpClient';
import { ILogger } from '../../../utils/logger/ILogger';
import { IPipeline } from '../../../utils/pipeline/IPipeline';
import { IBreweryService } from './IBreweryService';

export class BreweryService implements IBreweryService {
  private readonly breweriesEndpoint: string;
  private readonly breweryPipeline: IPipeline<any>;
  private readonly httpClient: IHttpClient;
  private readonly logger: ILogger;

  constructor(breweriesEndpoint: string, pipeline: IPipeline<any>, httpClient: IHttpClient, logger: ILogger) {
    this.breweriesEndpoint = breweriesEndpoint;
    this.breweryPipeline = pipeline;
    this.httpClient = httpClient;
    this.logger = logger;
  }

  /**
   * Runs the ETL pipeline with the brewery information we get from the breweries endpoint
   */
  public async runPipeline(): Promise<any> {
    this.logger.info(`Running Pipeline`);
    let data: any;
    try {
      const remoteBreweries = await this.getBreweries();
      data = this.breweryPipeline.invoke(remoteBreweries);
    } catch (err) {
      this.logger.error(`Pipeline execution failed`);
      throw err;
    }

    this.logger.info(`Successful Pipeline execution`);
    return data;
  }

  /**
   * Gets the breweries through HTTP call
   */
  private async getBreweries(): Promise<any[]> {
    this.logger.info(`Getting breweries from ${this.breweriesEndpoint}`);
    return await this.httpClient.get(this.breweriesEndpoint);
  }
}
