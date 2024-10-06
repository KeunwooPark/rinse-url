import { expect, it, describe } from '@jest/globals';
import { rinseUrl } from './rinse-url';

describe('rinseUrl', () => {
  it('should work for `https://www.google.com`', async () => {
    const url = 'https://www.google.com';
    const result = await rinseUrl(url);
    expect(result).toEqual('rinse-url');
  });

  it('should work with a real article URL.', async () => {
    const url =
      'https://www.noahpinion.blog/p/if-this-is-a-bad-economy-please-tell?utm_source=substack&utm_medium=email';
    const result = await rinseUrl(url);
    expect(result).toEqual('rinse-url');
  });
});
