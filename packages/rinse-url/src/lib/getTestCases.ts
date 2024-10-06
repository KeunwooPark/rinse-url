import { URLTestCase } from './URLTestCase';

/**
 * It returns an array of test cases for the given url.
 * @param url - The URL to generate test cases for.
 * @returns URLTestCase[] - An array of test cases.
 */
export function getTestCases(url: string): URLTestCase[] {
  const urlObj = new URL(url);
  const testCases: URLTestCase[] = [];
  const params = new URLSearchParams(urlObj.search);
  for (const key of params.keys()) {
    const newParams = new URLSearchParams(params);
    newParams.delete(key);
    testCases.push({
      url: `${urlObj.origin}${urlObj.pathname}?${newParams.toString()}`,
      excludedParam: key,
    });
  }
  return testCases;
}
