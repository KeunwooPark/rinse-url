export async function getHTML(url: string): Promise<string> {
  return fetch(url).then((response) => response.text());
}
