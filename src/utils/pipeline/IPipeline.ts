import { IOperation } from './IOperation';

export interface IPipeline<T> extends IOperation<T> {
  register(operation: IOperation<T>): void;
}
