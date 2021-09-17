import Logger from '../../utils/logger/Logger';
import * as express from 'express';

class Handler {
  /**
   * Log Errors
   */
  public static logErrors(err: Error, _req: express.Request, _res: express.Response, next: express.NextFunction): void {
    Logger.error(err.stack || '');

    next(err);
  }

  /**
   * Handles all the not found routes
   */
  public static notFoundHandler(_express: express.Application): any {
    _express.use('*', (req: express.Request, res: express.Response) => {
      Logger.error(`'${req.originalUrl}' not found`);
      res.status(404);
      return res.json({
        error: 'Not Found',
      });
    });

    return _express;
  }

  /**
   * Handles the api routes errors/exception
   */
  public static clientErrorHandler(
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): any {
    if (err.message === 'INVALID_USERNAME_OR_PASSWORD')
      return res.status(401).send({ error: 'Invalid Username or Passowrd' });

    return res.status(500).send({ error: 'Something went wrong!' });
  }
}

export default Handler;
