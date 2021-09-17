import { IHttpClient } from '../../../src/utils/http/IHttpClient';
export class HttpClientMock implements IHttpClient {
  public getMockFn: jest.Mock<any, any> = jest.fn();

  get(url: string): Promise<any> {
    return this.getMockFn(url);
  }
}
