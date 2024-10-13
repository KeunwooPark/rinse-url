import { rinseURL } from '@rinse-url/rinse-url';
export async function POST(request: Request) {
  const { url, options } = await request.json();
  const rinsed = await rinseURL(url, options);
  return new Response(JSON.stringify({ rinsed }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
