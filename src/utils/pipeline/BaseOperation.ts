import { IOperation } from './IOperation';

export abstract class BaseOperation<T> implements IOperation<T> {
  protected readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  describe(): string {
    return `Operation: ${this.name}`;
  }

  abstract invoke(data: T): T;
}
