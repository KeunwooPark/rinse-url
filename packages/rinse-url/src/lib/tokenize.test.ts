import { expect, it, describe } from '@jest/globals';
import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('should split a string into an array of words.', () => {
    expect(tokenize('hello')).toEqual(['hello']);
  });

  it('should split a string into an array of words.', () => {
    expect(tokenize('hello world')).toEqual(['hello', 'world']);
  });

  it('should ignore leading and trailing whitespace.', () => {
    expect(tokenize(' hello world ')).toEqual(['hello', 'world']);
  });

  it('should ignore special characters.', () => {
    expect(tokenize('hello, world!')).toEqual(['hello', 'world']);
  });

  it('should work with non-ASCII characters.', () => {
    expect(tokenize('안녕, 세상!')).toEqual(['안녕', '세상']);
  });
});
