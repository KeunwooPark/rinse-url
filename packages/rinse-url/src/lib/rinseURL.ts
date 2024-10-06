import { calculateSimilarity } from './calculateSimilarity';
import { getHTML } from './getHTML';
import { getMainContent } from './getMainContent';
import { getTestCases } from './getTestCases';
import { syncWait } from './syncWait';

export interface RinseOptions {
  testInterval?: number;
  similarityThreshold?: number;
}

export interface ParsedRinseOptions {
  testInterval: number;
  similarityThreshold: number;
}

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

    if (mainContent.title !== trueMainContent.title) {
      continue;
    }

    const similarity = calculateSimilarity(
      mainContent.content,
      trueMainContent.content
    );

    if (similarity >= parsedOptions.similarityThreshold) {
      paramsToExclude.push(testCase.excludedParam);
    }
  }

  return excludeParams(url, paramsToExclude);
}

function parseOptions(options: RinseOptions): ParsedRinseOptions {
  return {
    testInterval: options.testInterval || 300,
    similarityThreshold: options.similarityThreshold || 0.8,
  };
}

function excludeParams(url: string, params: string[]): string {
  const urlObj = new URL(url);
  for (const param of params) {
    urlObj.searchParams.delete(param);
  }
  return urlObj.toString();
}
