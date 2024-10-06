'use client';
import { rinseURL } from '@rinse-url/rinse-url';
import { useState } from 'react';

export default function Index() {
  const [url, setUrl] = useState('');
  const [rinsed, setRinsed] = useState('');
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const rinsed = await rinseURL(url);
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
        <button className="btn btn-primary ms-3">Rinse</button>
      </div>
    </div>
  );
}
