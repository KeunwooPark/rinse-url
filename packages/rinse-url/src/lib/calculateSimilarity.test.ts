import { calculateSimilarity } from './calculateSimilarity';

describe('calculateSimilarity', () => {
  it('should return 0 for completely different strings.', () => {
    expect(
      calculateSimilarity(
        'The quick brown fox jumps over the lazy dog.',
        'A bright star shines in night sky.'
      )
    ).toEqual(0);
  });

  it('should return 1 for the same strings.', () => {
    const input = 'The quick brown fox jumps over the lazy dog.';
    expect(calculateSimilarity(input, input)).toEqual(1);
  });
});
