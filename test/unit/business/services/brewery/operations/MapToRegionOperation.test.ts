import { MapToRegionOperation } from '../../../../../../src/business/services/brewery/operations/MapToRegionOperation';
import { UnitedStatesRegions } from '../../../../../../src/business/services/brewery/UnitedStatesRegions';

describe('Services > Breweries > Pipeline > Operations > MapToRegionOperation', () => {
  it('Should remove breweries without latitude', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        state: 'state1',
        breweries: [{ state: 'state1', longitude: 1.0 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(0);
  });

  it('Should remove breweries without longitude', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        state: 'state1',
        breweries: [{ state: 'state1', latitude: 1.0 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(0);
  });

  it('Should not remove breweries without both latitude and longitude', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        state: 'state1',
        breweries: [
          { state: 'state1', latitude: 1.0, longitude: 1.0 },
          { state: 'state1', longitude: 1.0 },
          { state: 'state1', latitude: 1.0 },
        ],
      },
    ];
    const expectedResult = [
      {
        state: 'state1',
        breweries: [{ state: 'state1', latitude: 1.0, longitude: 1.0, region: 'Northeast' }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].breweries.length).toBe(1);
    expect(result).toEqual(expectedResult);
  });

  it('Should map a brewery in Los Angeles to the WEST region', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        breweries: [{ latitude: 34.052235, longitude: -118.243683 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].breweries[0].region).toBe(UnitedStatesRegions.WEST);
  });

  it('Should map a brewery in New York to the NORTHEAST region', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        breweries: [{ latitude: 40.712776, longitude: -74.005974 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].breweries[0].region).toBe(UnitedStatesRegions.NORTHEAST);
  });

  it('Should map a brewery in Chicago to the MIDWEST region', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        breweries: [{ latitude: 41.878113, longitude: -87.629799 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].breweries[0].region).toBe(UnitedStatesRegions.MIDWEST);
  });

  it('Should map a brewery in Miami to the SOUTH region', () => {
    // Arrange
    const operation = new MapToRegionOperation();
    const input = [
      {
        breweries: [{ latitude: 25.761681, longitude: -80.191788 }],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].breweries[0].region).toBe(UnitedStatesRegions.SOUTH);
  });
});
