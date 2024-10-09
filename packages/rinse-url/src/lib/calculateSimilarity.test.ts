import { expect, it, describe } from '@jest/globals';
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

  it('should return value between 0 and 1 for strings that share some of the words.', () => {
    const similarity = calculateSimilarity(
      'The quick brown fox jumps over the lazy dog.',
      'A quick star shines in night sky.'
    );
    expect(similarity).toBeGreaterThan(0);
    expect(similarity).toBeLessThan(1);
  });
});
