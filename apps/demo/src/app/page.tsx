'use client';

import { Metadata } from 'next';
import { useState } from 'react';

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
};

export default function Index() {
  const [url, setUrl] = useState('');
  const [rinsed, setRinsed] = useState('');
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    setRinsed('');

    // call post request to /api/rinse. send the url in the body.
    const response = await fetch('/api/rinse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    const rinsed = data.rinsed;
    setRinsed(rinsed);
    setLoading(false);
  };

  return (
    <div className="m-3 ">
      <h1 className="text-4xl font-bold">rinse-url demo</h1>
      <div className="mt-3">
        <input
          type="text"
          placeholder="https://example.com?utm_source=twitter"
          className="input input-bordered w-full max-w-md"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className={`btn btn-primary ms-3 ${
            loading ? 'loading loading-spinner' : ''
          }`}
          onClick={onClick}
        >
          Rinse
        </button>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-bold">Rinsed URL</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        <a
          className="link"
          href={rinsed}
          target="_blank"
          rel="noreferrer noopener"
        >
          {rinsed}
        </a>
      </div>
    </div>
  );
}
