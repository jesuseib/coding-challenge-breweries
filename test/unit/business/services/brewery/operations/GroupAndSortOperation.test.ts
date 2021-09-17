import { GroupAndSortOperation } from '../../../../../../src/business/services/brewery/operations/GroupAndSortOperation';

describe('Services > Breweries > Pipeline > Operations > GroupAndSortOperation', () => {
  it('Should group by state and sort the breweries in each state by descending createAt field', () => {
    // Arrange
    const operation = new GroupAndSortOperation();
    const input = [
      { state: 'state1', name: 'brewery1', createdAt: '2010-01-01T00:00:00.000Z' },
      { state: 'state2', name: 'brewery2', createdAt: '1950-01-01T00:00:00.000Z' },
      { state: 'state1', name: 'brewery3', createdAt: '2018-01-01T00:00:00.000Z' },
      { state: 'state1', name: 'brewery4', createdAt: '2019-01-01T00:00:00.000Z' },
      { state: 'state2', name: 'brewery5', createdAt: '2000-01-01T00:00:00.000Z' },
    ];
    const expectedResult = [
      {
        state: 'state1',
        breweries: [
          { state: 'state1', name: 'brewery4', createdAt: '2019-01-01T00:00:00.000Z' },
          { state: 'state1', name: 'brewery3', createdAt: '2018-01-01T00:00:00.000Z' },
          { state: 'state1', name: 'brewery1', createdAt: '2010-01-01T00:00:00.000Z' },
        ],
      },
      {
        state: 'state2',
        breweries: [
          { state: 'state2', name: 'brewery5', createdAt: '2000-01-01T00:00:00.000Z' },
          { state: 'state2', name: 'brewery2', createdAt: '1950-01-01T00:00:00.000Z' },
        ],
      },
    ];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
