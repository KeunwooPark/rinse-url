import axios from 'axios';
export async function getHTML(url: string, timeout: number): Promise<string> {
  const response = await axios.get(url, {
    timeout,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      Referer: 'https://www.google.com/',
      Connection: 'keep-alive',
    },
  });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch the URL: ${url}`);
  }
  return response.data;
}
