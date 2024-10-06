import { expect, it, describe } from '@jest/globals';
import { rinseURL } from './rinseURL';

describe('rinseURL', () => {
  it('should remove meaningless params', async () => {
    const url = 'https://www.google.com/?param1=1&param2=2';
    const result = await rinseURL(url);
    expect(result).toEqual('https://www.google.com/');
  });

  it('should remove utm tags.', async () => {
    const url =
      'https://www.noahpinion.blog/p/if-this-is-a-bad-economy-please-tell?utm_source=substack&utm_medium=email';
    const result = await rinseURL(url);
    expect(result).toEqual(
      'https://www.noahpinion.blog/p/if-this-is-a-bad-economy-please-tell'
    );
  });
});
