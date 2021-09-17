import { IOperation } from './IOperation';
import { IPipeline } from './IPipeline';
import { BaseOperation } from './BaseOperation';

export class Pipeline<T> extends BaseOperation<T> implements IOperation<T>, IPipeline<T> {
  protected readonly operations: IOperation<T>[] = [];

  constructor(name: string) {
    super(name);
  }
  // invoke all the operations
  invoke(data: T): T {
    let output: T = data;
    for (const operation of this.operations) {
      output = operation.invoke(output);
    }

    return output;
  }

  // adds an operation to the pipeline
  register(operation: IOperation<T>): void {
    this.operations.push(operation);
  }

  describe(): string {
    return [`\nPipeline: ${this.name}`, ...this.operations.map((x) => `\t|->${x.describe()}`)].join('\n');
  }
}
