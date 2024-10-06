import { getHTML } from './getHTML';
import { getMainContent } from './getMainContent';
import { getTestCases } from './getTestCases';

export async function rinseUrl(url: string): Promise<string> {
  const trueHTML = await getHTML(url);
  const trueMainContent = getMainContent(trueHTML);

  const testCases = getTestCases(url);

  const paramsToExclude: string[] = [];

  for (const testCase of testCases) {
    const html = await getHTML(testCase.url);
    // const mainContent = getMainContent(html);
  }

  return 'rinse-url';
}
