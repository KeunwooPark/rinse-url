/**
 * It converts a string of HTML to a DOM object.
 * It uses different library by checking whether the environment is Node.js or browser.
 * @param html - A string of HTML.
 * @returns
 */
export async function htmlToDom(html: string): Promise<Document> {
  if (typeof document !== 'undefined') {
    // Browser
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
  } else {
    // Node.js
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM(html);
    return dom.window.document;
  }
}
