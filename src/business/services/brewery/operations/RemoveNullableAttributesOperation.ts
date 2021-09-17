import { BaseOperation } from '../../../../utils/pipeline/BaseOperation';

export class RemoveNullableAttributesOperation extends BaseOperation<any[]> {
  constructor() {
    super('RemoveNullableAttributesOperation');
  }

  /**
   * Removes the null fields
   * @param data
   */
  invoke(data: any[]): any[] {
    return data.map((x) => {
      return Object.fromEntries(Object.entries(x).filter(([_, v]) => v != null));
    });
  }
}
