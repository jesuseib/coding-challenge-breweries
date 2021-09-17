import { UnitedStatesRegions } from '../../../../../src/business/services/brewery/UnitedStatesRegions';

describe('UnitedStatesRegions', () => {
  it('should map to four main regions in the US', () => {
    // Asserts
    expect(UnitedStatesRegions.WEST).toBe('West');
    expect(UnitedStatesRegions.MIDWEST).toBe('Midwest');
    expect(UnitedStatesRegions.NORTHEAST).toBe('Northeast');
    expect(UnitedStatesRegions.SOUTH).toBe('South');
  });
});
