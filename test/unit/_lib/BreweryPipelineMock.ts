import { IOperation } from '../../../src/utils/pipeline/IOperation';
import { IPipeline } from '../../../src/utils/pipeline/IPipeline';

export class BreweryPipelineMock implements IPipeline<any> {
  public registerMockFn: jest.Mock<any, any> = jest.fn();
  public invokeMockFn: jest.Mock<any, any> = jest.fn();
  public describeMockFn: jest.Mock<any, any> = jest.fn();

  register(operation: IOperation<any>): void {
    throw new Error('Method not implemented.');
  }
  invoke(data: any) {
    return this.invokeMockFn(data);
  }
  describe(): string {
    throw new Error('Method not implemented.');
  }
}
