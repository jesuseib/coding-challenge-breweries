import cors from 'cors';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import Logger from '../../utils/logger/Logger';
import Passport from '../providers/Passport';

class HttpMiddleware {
  public static mount(expressApp: Application): Application {
    Logger.info('Loading the \'HTTP\' middleware...');

    // parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    expressApp.use(bodyParser.json());

    // Disable the x-powered-by header in response
    expressApp.disable('x-powered-by');

    // Enables the CORS
    expressApp.use(cors());

    // Loads the passport configuration
    expressApp = Passport.mount(expressApp);

    return expressApp;
  }
}

export default HttpMiddleware;
