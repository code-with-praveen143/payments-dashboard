"use client"
import { useState } from 'react';

export default function EncryptURL() {
  const [encryptedURL, setEncryptedURL] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEncryptedURL = async () => {
    setLoading(true);
    const requestBody = {
      merchantID: '386949',
      mandatoryFields: '123456|11|100',
      optionalFields: '',
      returnURL: 'https://khit.campusify.io/dashboard/return-url',
      referenceNo: '123456',
      subMerchantID: '11',
      transactionAmount: '100',
      payMode: '9',
    };

    try {
      const response = await fetch('http://localhost:5000/api/encryption/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setEncryptedURL(data.encryptedURL);
    } catch (error) {
      console.error('Failed to generate encrypted URL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Encrypt ICICI Payment URL</h1>
      <button onClick={generateEncryptedURL} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Encrypted URL'}
      </button>
      {encryptedURL && (
        <div>
          <p>Encrypted URL:{encryptedURL}</p>
          <a href={encryptedURL} target="_blank" rel="noopener noreferrer">
            Proceed to Payment
          </a>
        </div>
      )}
    </div>
  );
}
