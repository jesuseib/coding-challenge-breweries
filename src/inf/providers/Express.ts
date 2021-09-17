import express from 'express';

import Locals from './Locals';
import Routes from './Routes';
import CorsMiddleware from '../middlewares/CorsMiddleware';
import HttpMiddleware from '../middlewares/HttpMiddleware';

import ExceptionHandler from '../exception/Handler';

class Express {
  /**
   * Creates the express object
   */
  public express: express.Application;

  /**
   * Initializes the express server
   */
  constructor() {
    this.express = express();

    // mounting middlewares
    this.mountDotEnv();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  /**
   * Mounts configuration
   */
  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  /**
   * Mounts middlewares
   */
  private mountMiddlewares(): void {
    // Mount CORS middleware
    if (this.express.locals.app.isCORSEnabled) {
      this.express = CorsMiddleware.mount(this.express);
    }

    // Mount basic express apis middleware
    this.express = HttpMiddleware.mount(this.express);
  }

  /**
   * Mounts routes
   */
  private mountRoutes(): void {
    this.express = Routes.mountApi(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): any {
    const port: number = Locals.config().port;

    // Registering Exception / Error Handlers
    this.express.use(ExceptionHandler.logErrors);
    this.express.use(ExceptionHandler.clientErrorHandler);
    this.express = ExceptionHandler.notFoundHandler(this.express);

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
      })
      .on('error', (err: Error) => {
        return console.log('Error: ', err);
      });
  }
}

/** Export the express module */
export default new Express();
