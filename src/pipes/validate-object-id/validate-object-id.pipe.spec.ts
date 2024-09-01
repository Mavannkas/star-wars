import { ValidateObjectIdPipe } from './validate-object-id.pipe';

describe('ValidateObjectIdPipe', () => {
  let pipe: ValidateObjectIdPipe;

  beforeAll(() => {
    pipe = new ValidateObjectIdPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate a valid ObjectId', () => {
    // Given
    const validObjectId = '5f9f1f1b600f7b1d6c6f1f6b';

    // When
    const result = pipe.transform(validObjectId);

    // Then
    expect(result.toHexString()).toBe(validObjectId);
  });

  it('should throw an error if ObjectId is invalid', () => {
    // Given
    const invalidObjectId = 'invalidObjectId';

    // When / Then
    expect(() => pipe.transform(invalidObjectId)).toThrow();
  });
});
