export interface IOperation<T> {
  invoke(data: T): T;
  describe(): string;
}
