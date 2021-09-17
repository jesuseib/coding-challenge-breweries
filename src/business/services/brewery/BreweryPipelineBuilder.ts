import Logger from '../../../utils/logger/Logger';
import { IOperation } from '../../../utils/pipeline/IOperation';
import { Pipeline } from '../../../utils/pipeline/Pipeline';
import { GroupAndSortOperation } from './operations/GroupAndSortOperation';
import { LoggerWrapperOperation } from './operations/LoggerWrapperOperation';
import { MapToRegionOperation } from './operations/MapToRegionOperation';
import { RemoveNullableAttributesOperation } from './operations/RemoveNullableAttributesOperation';
import { SnakeToCamelCaseOperation } from './operations/SnakeToCamelCaseOperation';

export class BreweryPipelineBuilder {
  private static operations: IOperation<any>[] = [
    new RemoveNullableAttributesOperation(),
    new SnakeToCamelCaseOperation(),
    new GroupAndSortOperation(),
    new MapToRegionOperation(),
  ];

  /**
   * Builds the pipeline without wrapper operation logging
   */
  public static build(name: string): Pipeline<any> {
    const pipeline = new Pipeline<any>(name);
    this.operations.forEach((x) => {
      pipeline.register(x);
    });

    return pipeline;
  }

  /**
   * Builds the pipeline logging the executions
   */
  public static buildWithLogger(name: string): Pipeline<any> {
    const logger = Logger;
    const pipeline = new Pipeline<any>(name);
    this.operations.forEach((x) => {
      pipeline.register(new LoggerWrapperOperation(x, logger));
    });

    return pipeline;
  }
}
