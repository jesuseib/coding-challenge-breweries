import { IBreweryService } from '../../../src/business/services/brewery/IBreweryService';

export class BreweryServiceMock implements IBreweryService {
  private runPipelineMockFn: jest.Mock<any, any>;

  constructor(runPipelineMockFn: jest.Mock) {
    this.runPipelineMockFn = runPipelineMockFn;
  }

  public runPipeline() {
    return this.runPipelineMockFn();
  }
}
