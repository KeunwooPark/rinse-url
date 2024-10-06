import { expect, it, describe } from '@jest/globals';
import { getTestCases } from './getTestCases';

describe('getTestCases', () => {
  it('should return an array of test cases for the given url', () => {
    const url = 'https://example.com/path?param1=value1&param2=value2';
    const testCases = getTestCases(url);
    expect(testCases).toEqual([
      {
        url: 'https://example.com/path?param2=value2',
        excludedParam: 'param1',
      },
      {
        url: 'https://example.com/path?param1=value1',
        excludedParam: 'param2',
      },
    ]);
  });
});
