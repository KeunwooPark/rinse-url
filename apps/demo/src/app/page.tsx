'use client';

import { useState } from 'react';

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
    <div className="m-3">
      <h1 className="text-4xl font-bold">rinse-url demo</h1>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Enter a URL"
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
        <div>rinsed</div>
        <a href={rinsed} target="_blank" rel="noreferrer noopener">
          {rinsed}
        </a>
      </div>
    </div>
  );
}
