// HttpClient Mock for development purposes
export class MockedHttpClient<T> {
  private readonly data: T;

  constructor(data: T) {
    this.data = data;
  }

  get(_url?: string): Promise<T> {
    const _data = this.data;
    return new Promise((resolve, _reject) => {
      return resolve(_data);
    });
  }
}
