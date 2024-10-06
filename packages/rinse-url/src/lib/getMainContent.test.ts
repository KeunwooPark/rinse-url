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
});
