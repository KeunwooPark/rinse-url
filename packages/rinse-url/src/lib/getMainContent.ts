import { Readability } from '@mozilla/readability';
import { HTMLContent } from './HTMLContent';
import { JSDOM } from 'jsdom';

export function getMainContent(html: string): HTMLContent {
  const doc = new JSDOM(html);
  const article = new Readability(doc.window.document).parse();
  return {
    title: article?.title?.trim() || '',
    content: article?.textContent?.trim() || '',
  };
}
