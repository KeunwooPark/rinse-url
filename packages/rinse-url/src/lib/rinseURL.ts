import { calculateSimilarity } from './calculateSimilarity';
import { getHTML } from './getHTML';
import { getMainContent } from './getMainContent';
import { getTestCases } from './getTestCases';
import { syncWait } from './syncWait';

/**
 * The options for the `rinseURL` function.
 *
 * @param testInterval The interval between each test in milliseconds. Default is `300`.
 * @param similarityThreshold The threshold of similarity to consider the content as the same. Default is `0.9`.
 */
export interface RinseOptions {
  testInterval?: number;
  similarityThreshold?: number;
}

export interface ParsedRinseOptions {
  testInterval: number;
  similarityThreshold: number;
}

/**
 * It rinses the URL by removing the unnecessary query parameters.
 *
 * @param url The URL to rinse.
 * @param options The options for the `rinseURL` function.
 * @returns The rinsed URL.
 */
export async function rinseURL(
  url: string,
  options?: RinseOptions
): Promise<string> {
  const parsedOptions = parseOptions(options || {});
  const trueHTML = await getHTML(url);
  const trueMainContent = await getMainContent(trueHTML);

  const testCases = getTestCases(url);

  const paramsToExclude: string[] = [];

  for (const testCase of testCases) {
    const html = await getHTML(testCase.url);
    await syncWait(parsedOptions.testInterval);
    const mainContent = await getMainContent(html);

    const similarity = calculateSimilarity(mainContent, trueMainContent);
    console.log('smilarity', similarity);
    if (similarity >= parsedOptions.similarityThreshold) {
      paramsToExclude.push(testCase.excludedParam);
    }
  }

  return excludeParams(url, paramsToExclude);
}

function parseOptions(options: RinseOptions): ParsedRinseOptions {
  return {
    testInterval: options.testInterval || 300,
    similarityThreshold: options.similarityThreshold || 0.9,
  };
}

function excludeParams(url: string, params: string[]): string {
  const urlObj = new URL(url);
  for (const param of params) {
    urlObj.searchParams.delete(param);
  }
  return urlObj.toString();
}
