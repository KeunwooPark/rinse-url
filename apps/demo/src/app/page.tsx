import { Metadata } from 'next';
import Body from './Body';

export const metadata: Metadata = {
  title: 'rinse-url demo',
  description:
    'This tool removes unnecessary parameters, such as user-tracking codes, from a URL. In other words, for a given URL, it returns the shortest URL that has the same content.',
  keywords: [
    'rinse-url',
    'rinse',
    'url',
    'query',
    'parameters',
    'tracking',
    'utm',
  ],
  verification: {
    google: 'uP4A9YEesZWhynRR8HLx3OafZMvXkcbfwrt1C2TcMAo',
  },
};

export default function Index() {
  return <Body />;
}
