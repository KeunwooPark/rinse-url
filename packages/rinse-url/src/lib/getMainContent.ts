import { Readability } from '@mozilla/readability';
import { HTMLContent } from './HTMLContent';
import { htmlToDom } from './htmlToDom';

export async function getMainContent(html: string): Promise<HTMLContent> {
  const doc = await htmlToDom(html);
  const article = new Readability(doc).parse();
  return {
    title: article?.title?.trim() || '',
    content: article?.textContent?.trim() || '',
  };
}
