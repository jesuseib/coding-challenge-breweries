import cors from 'cors';
import { Application } from 'express';

import Logger from '../../utils/logger/Logger';
import Locals from '../providers/Locals';

class CorsMiddleware {
  public mount(_express: Application): Application {
    Logger.info('Loading the \'CORS\' middleware...');

    const options = {
      origin: Locals.config().url,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    };

    _express.use(cors(options));

    return _express;
  }
}

export default new CorsMiddleware();
