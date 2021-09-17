import { BaseOperation } from '../../../../utils/pipeline/BaseOperation';
import { UnitedStatesStateRegionMap } from '../UnitedStatesRegions';

export class MapToRegionOperation extends BaseOperation<any[]> {
  constructor() {
    super('MapToRegionOperation');
  }

  /**
   * Filters the breweries without latitude & longitude
   * Adds region data to breweries
   * @param data Breweries
   */
  invoke(data: any[]): any[] {
    // filter lat long
    const breweriesWithLatLon: any[] = [];

    // traverse the breweries in the state and add the region data
    for (const stateBreweriesData of data) {
      // filter out the breweries not having both latitude and longitude properties set
      let currentStateBreweriesWithLatLon = stateBreweriesData.breweries.filter(
        (x: { latitude: any; longitude: any }) => x.latitude && x.longitude,
      );

      if (currentStateBreweriesWithLatLon && currentStateBreweriesWithLatLon.length) {
        // add region property
        currentStateBreweriesWithLatLon = currentStateBreweriesWithLatLon.map((x: any) => this.addRegionProperty(x));

        // add the current state to the result
        breweriesWithLatLon.push({ state: stateBreweriesData.state, breweries: currentStateBreweriesWithLatLon });
      }
    }
    return breweriesWithLatLon;
  }

  /**
   * Adds a 'region' property to the Object
   * @param brewery
   */
  addRegionProperty(brewery: any): any {
    const statesByDistance = this.getStatesOrderedByDistance(brewery.latitude, brewery.longitude);

    return Object.assign(brewery, { region: statesByDistance[0].region });
  }

  /**
   * Gets the USA's States ordered by distance to the brewery's lat & lon
   * @param breweryLat Brewery Latitude
   * @param breweryLon Brewery Longitude
   */
  getStatesOrderedByDistance(breweryLat: string, breweryLon: string): any[] {
    const statesByDistance = UnitedStatesStateRegionMap.map((x) => {
      return { ...x, distance: this.getDistance(breweryLat, breweryLon, x.latitude, x.longitude) };
    });
    statesByDistance.sort((a, b) => {
      return a.distance - b.distance;
    });
    return statesByDistance;
  }

  /** Converts degrees to radians */
  toRad(num: number): number {
    return (num * Math.PI) / 180;
  }

  /**
   *  Calculates the distance in kilometers between 2 [lat, lon]
   *  from https://gist.github.com/clauswitt/1604972
   */
  getDistance(startLatitude: string, startLongintude: string, endLatitude: number, endLongitude: number) {
    const decimals = 2;
    const earthRadius = 6371; // km
    const startLat = parseFloat(startLatitude);
    const startLon = parseFloat(startLongintude);
    const endLat = endLatitude;
    const endLon = endLongitude;

    const dLat = this.toRad(endLat - startLat);
    const dLon = this.toRad(endLon - startLon);
    const lat1Rad = this.toRad(startLat);
    const lat2Rad = this.toRad(endLat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}
