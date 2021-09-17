import * as express from 'express';
import { IBreweryService } from 'src/business/services/brewery/IBreweryService';

export default class BreweriesController {
  private readonly breweryService: IBreweryService;

  constructor(breweryService: IBreweryService) {
    this.breweryService = breweryService;
  }

  /**
   * /breweries handler
   * @param req
   * @param res
   * @param next
   */
  public async getBreweries(_req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
    try {
      const result = await this.breweryService.runPipeline();
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
