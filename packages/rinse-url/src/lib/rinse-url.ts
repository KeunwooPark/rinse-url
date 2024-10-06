import { getHTML } from './getHTML';
import { getMainContent } from './getMainContent';

export async function rinseUrl(url: string): Promise<string> {
  const html = await getHTML(url);
  const trueMainContent = getMainContent(html);

  return 'rinse-url';
}
