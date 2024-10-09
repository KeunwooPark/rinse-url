import parse, { DOMNode, Element } from 'html-dom-parser';

export async function getMainContent(html: string): Promise<string> {
  const parsedResult = parse(html);
  const textContents = parsedResult.map(extractTextContent);

  const textContent = textContents.join(' ');

  return normalizeWhitespace(textContent).trim();
}

function extractTextContent(node: DOMNode): string {
  if (node.type === 'text') {
    return node.data;
  }
  // check if type is Element and has children

  // skip style and script tags
  if (node.type === 'style' || node.type === 'script') {
    return '';
  }

  if ((node as Element).children) {
    return (node as any).children.map(extractTextContent).join('');
  }

  return '';
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}
