import { ILogger } from '../../../../utils/logger/ILogger';
import { BaseOperation } from '../../../../utils/pipeline/BaseOperation';
import { IOperation } from '../../../../utils/pipeline/IOperation';

export class LoggerWrapperOperation<T> extends BaseOperation<T> {
  private readonly logger: ILogger;
  private readonly operation: IOperation<T>;

  constructor(operation: IOperation<T>, logger: ILogger) {
    super('LoggerWrapperOperation');
    this.operation = operation;
    this.logger = logger;
  }

  /**
   * Helper (wrapper) Logger Operation to trace when a Operation stated and ended
   * More tracing data can be added here without affeting the Operation itself
   * @param data
   */
  invoke(data: T): T {
    this.logger.info(`Before Executing: ${this.operation.describe()}`);
    let result: T = data;
    try {
      result = this.operation.invoke(data);
    } catch (err) {
      this.logger.error(`Operation Failed: ${this.operation.describe()}`);
      throw err;
    }

    this.logger.info(`After Executing: ${this.operation.describe()}`);
    return result;
  }

  describe(): string {
    return `Operation: ${this.name}\n\t\t |-> ${this.operation.describe()}`;
  }
}
