import { expect, it, describe } from '@jest/globals';
import { getMainContent } from './getMainContent';
import { getHTML } from './getHTML';

describe('getMainContent', () => {
  it('should return the title and content of the main article.', async () => {
    const html = `
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <h1>Test</h1>
          <p>This is a test.</p>
        </body>
      </html>
    `;
    const result = await getMainContent(html);
    expect(result).toEqual({
      title: 'Test',
      content: 'This is a test.',
    });
  });

  it('should get the main content of `https://example.com/`.', async () => {
    const url = 'https://example.com/';
    const html = await getHTML(url);
    const mainContent = await getMainContent(html);

    const cleanedContent = mainContent.content.replace(/\s+/g, ' ').trim();
    mainContent.content = cleanedContent;

    expect(mainContent).toEqual({
      title: 'Example Domain',
      content:
        'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission. More information...',
    });
  });

  it("should get the main content of a real article's URL.", async () => {
    const url =
      'https://www.noahpinion.blog/p/if-this-is-a-bad-economy-please-tell?utm_source=substack&utm_medium=email';

    const html = await getHTML(url);

    const mainContent = await getMainContent(html);

    expect(mainContent.title).toBeTruthy();
    expect(mainContent.content).toBeTruthy();
  });
});
