import { RemoveNullableAttributesOperation } from '../../../../../../src/business/services/brewery/operations/RemoveNullableAttributesOperation';

describe('Services > Breweries > Pipeline > Operations > RemoveNullableAttributesOperation', () => {
  it('Should remove null properties', () => {
    // Arrange
    const operation = new RemoveNullableAttributesOperation();
    const input = [{ field1: 'value1', field2: null, field3: 1234 }];
    const expectedResult = [{ field1: 'value1', field3: 1234 }];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('Should not remove any properties', () => {
    // Arrange
    const operation = new RemoveNullableAttributesOperation();
    const input = [{ field1: 'value1', field2: true, field3: 1234 }];

    // Act
    const result = operation.invoke(input);

    // Assert
    expect(result).toEqual(input);
    expect(Object.keys(result[0]).length).toBe(3);
  });
});
