import { LoggerWrapperOperation } from '../../../../../../src/business/services/brewery/operations/LoggerWrapperOperation';
import { IOperation } from '../../../../../../src/utils/pipeline/IOperation';
import { LoggerMock } from '../../../../_lib/LoggerMock';

describe('Services > Breweries > Pipeline > Operations > LoggerWrapperOperation', () => {
  let loggerMock = new LoggerMock();

  beforeEach(() => {
    loggerMock.clearAllMockFn();
  });

  it('Should log before and after operations execution', () => {
    // Arrange
    const input = [{ foo: 'bar' }];
    const expectedResult = [{ foo2: 'bar2' }];

    const targetMockOperationFn = {
      invoke: jest.fn(() => {
        return expectedResult;
      }),
      describe: () => 'OPERATION_NAME',
    } as unknown as IOperation<any>;
    const loggerOperation = new LoggerWrapperOperation(targetMockOperationFn, loggerMock);

    // Act
    const result = loggerOperation.invoke(input);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Before Executing: OPERATION_NAME`);
    expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`After Executing: OPERATION_NAME`);
    expect(loggerMock.errorMockFn).not.toHaveBeenCalledWith(`Operation Failed: OPERATION_NAME`);
  });

  it('Should log before and if it fails', () => {
    // Arrange
    const input = [{ foo: 'bar' }];
    const expectedResult = [{ foo2: 'bar2' }];

    const targetMockOperationFn = {
      invoke: jest.fn(() => {
        throw new Error('error');
      }),
      describe: () => 'OPERATION_NAME',
    } as unknown as IOperation<any>;
    const loggerOperation = new LoggerWrapperOperation(targetMockOperationFn, loggerMock);

    try {
      // Act
      loggerOperation.invoke(input);
    } catch (err) {
      // Assert
      expect(loggerMock.infoMockFn).toHaveBeenCalledWith(`Before Executing: OPERATION_NAME`);
      expect(loggerMock.errorMockFn).toHaveBeenCalledWith(`Operation Failed: OPERATION_NAME`);
      expect(loggerMock.infoMockFn).not.toHaveBeenCalledWith(`After Executing: OPERATION_NAME`);
    }
  });
});
