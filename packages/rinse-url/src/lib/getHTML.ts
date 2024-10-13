import axios from 'axios';
export async function getHTML(url: string, timeout: number): Promise<string> {
  const response = await axios.get(url, { timeout });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch the URL: ${url}`);
  }
  return response.data;
}
