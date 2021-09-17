import { Application } from 'express';
import Logger from '../../utils/logger/Logger';

import apiRouter from '../../app/routes/Api';

class Routes {
  public mountApi(_express: Application): Application {
    const apiPrefix = _express.locals.app.apiPrefix;
    Logger.info(`Routes :: Mounting API Routes at '${apiPrefix}'... `);
    return _express.use(apiPrefix ? `/${apiPrefix}` : '', apiRouter);
  }
}

export default new Routes();
