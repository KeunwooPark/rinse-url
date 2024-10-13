'use client';

import { DefaultRinseOptions } from '@rinse-url/rinse-url';
import { useState } from 'react';
import OptionInput from '../components/OptionInput';

export default function Body() {
  const [url, setUrl] = useState('');
  const [rinsed, setRinsed] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(DefaultRinseOptions);

  const onClick = async () => {
    setLoading(true);
    setRinsed('');

    // call post request to /api/rinse. send the url in the body.
    try {
      const response = await fetch('/api/rinse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options }),
      });
      const data = await response.json();
      const rinsed = data.rinsed;
      setRinsed(rinsed);
    } catch (error: unknown) {
      const e = error as Error;
      alert('Failed to rinse the URL. error: ' + e.message);
    } finally {
      setLoading(false);
    }
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
      <div>
        <h2 className="text-2xl mt-3 font-bold">Options</h2>
        <div className="mt-3">
          <OptionInput
            label={'test interval (ms)'}
            onChange={(value) =>
              setOptions({ ...options, testInterval: value })
            }
            value={options.testInterval}
          />
          <OptionInput
            label={'similarity threshold (0-1)'}
            onChange={(value) =>
              setOptions({ ...options, similarityThreshold: value })
            }
            value={options.similarityThreshold}
          />
          <OptionInput
            label={'timeout (ms)'}
            onChange={(value) => setOptions({ ...options, timeout: value })}
            value={options.timeout}
          />
        </div>
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
