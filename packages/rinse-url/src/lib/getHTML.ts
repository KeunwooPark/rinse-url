import axios from 'axios';
export async function getHTML(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}
