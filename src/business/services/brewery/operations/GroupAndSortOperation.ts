import { BaseOperation } from '../../../../utils/pipeline/BaseOperation';

export class GroupAndSortOperation extends BaseOperation<any[]> {
  constructor() {
    super('GroupAndSortOperation');
  }

  /**
   * Groups the breweries by state, and sorts them by the descending `createdAt` value
   * @param data
   */
  invoke(data: any[]): any[] {
    // creates a map State=>Breweries
    const breweriesByStateMap = data.reduce((acc: Map<string, any[]>, brewery: any): any => {
      let breweriesInState: any[] = [];
      if (acc.has(brewery.state)) {
        breweriesInState = acc.get(brewery.state) || [];
      }
      breweriesInState.push(brewery);
      acc.set(brewery.state, breweriesInState);
      return acc;
    }, new Map<string, any[]>());

    // Creates the object to be returned (TODO: Strong Type)
    // {state: '', breweries: [ {...} ]}
    const breweriesByState: any[] = [];
    breweriesByStateMap.forEach((breweries: any[], state: any) => {
      const sortedByDescCreateAt = this.sortByDescCreateAt(breweries);
      breweriesByState.push({ state, breweries: sortedByDescCreateAt });
    });

    return breweriesByState;
  }

  /**
   * Sorts the breweries. From newer to older ones, based on the `createdAt` property
   * @param arr
   */
  private sortByDescCreateAt(arr: any[]): any[] {
    // -1  => a > b,
    //  0  => a == b
    //  1  => a < b
    return arr.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
}
