import { SnakeToCamelCaseOperation } from '../../../../../../src/business/services/brewery/operations/SnakeToCamelCaseOperation';

describe('Services > Breweries > Pipeline > Operations > SnakeToCamelCaseOperation', () => {
  it('Should convert fields from snake to camel case', () => {
    // Arrange
    const operation = new SnakeToCamelCaseOperation();
    const input = [{ first: 'value1', second_field: null, third_field_field: 1234 }];
    const expectedResult = [{ first: 'value1', secondField: null, thirdFieldField: 1234 }];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('Should not convert underscore field', () => {
    // Arrange
    const operation = new SnakeToCamelCaseOperation();
    const input = [{ _: 'value1' }];
    const expectedResult = [{ _: 'value1' }];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
