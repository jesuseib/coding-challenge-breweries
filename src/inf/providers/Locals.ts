import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
  /**
   * Makes env configs available for the app
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../../.env') });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const apiPrefix = process.env.API_PREFIX;

    const useMockBreweryCall = process.env.MOCK_BREWERY_CALL === 'true';
    const useLoggingPipeline = process.env.USE_LOGGING_PIPELINE === 'true';

    const username = process.env.USER_USERNAME;
    const passowrd = process.env.USER_PASSWORD;

    const breweriesEndpoint = process.env.BREWERIES_ENDPOINT;

    return {
      apiPrefix,
      isCORSEnabled,
      port,
      url,
      useMockBreweryCall,
      useLoggingPipeline,
      username,
      passowrd,
      breweriesEndpoint,
    };
  }

  /**
   * Injects the config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
