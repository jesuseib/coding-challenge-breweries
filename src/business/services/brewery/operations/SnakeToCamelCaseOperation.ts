import { BaseOperation } from '../../../../utils/pipeline/BaseOperation';

export class SnakeToCamelCaseOperation extends BaseOperation<any[]> {
  constructor() {
    super('SnakeToCamelCaseOperation');
  }

  /**
   * Converts the snake_case properties into camelCase
   * @param data
   */
  invoke(data: any[]): any[] {
    return data.map((x) => {
      return Object.fromEntries(Object.entries(x).map(([k, v]) => [this.convertSnakeToCamelCase(k), v]));
    });
  }

  private convertSnakeToCamelCase(str: string): string {
    return str.toLowerCase().replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));
  }
}
