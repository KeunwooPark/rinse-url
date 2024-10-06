import { getMainContent } from './getMainContent';

describe('getMainContent', () => {
  it('should return the title and content of the main article.', () => {
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
    expect(getMainContent(html)).toEqual({
      title: 'Test',
      content: 'This is a test.',
    });
  });

  it('should get the main content of `https://example.com/`.', async () => {
    const url = 'https://example.com/';
    const response = await fetch(url);
    const html = await response.text();

    const mainContent = getMainContent(html);

    const cleanedContent = mainContent.content.replace(/\s+/g, ' ').trim();
    mainContent.content = cleanedContent;

    expect(mainContent).toEqual({
      title: 'Example Domain',
      content:
        'This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission. More information...',
    });
  });
});
