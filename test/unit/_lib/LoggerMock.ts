import { ILogger } from '../../../src/utils/logger/ILogger';
export class LoggerMock implements ILogger {
  public debugMockFn = jest.fn();
  public infoMockFn = jest.fn();
  public warnMockFn = jest.fn();
  public errorMockFn = jest.fn();

  public debug(message: string): void {
    this.debugMockFn(message);
  }

  public info(message: string): void {
    this.infoMockFn(message);
  }

  public warn(message: string): void {
    this.warnMockFn(message);
  }

  public error(message: string): void {
    this.errorMockFn(message);
  }

  public custom(_filename: string, message: string): void {
    throw new Error('Method not implemented.');
  }

  public clearAllMockFn() {
    this.debugMockFn.mockClear();
    this.infoMockFn.mockClear();
    this.warnMockFn.mockClear();
    this.errorMockFn.mockClear();
  }
}
