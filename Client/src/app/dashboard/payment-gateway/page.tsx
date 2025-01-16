'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const EncryptAndReturn = () => {
  const [encryptedURL, setEncryptedURL] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const transactionIdParam = searchParams.get('transactionId');
    const statusParam = searchParams.get('status');

    if (transactionIdParam && statusParam) {
      setTransactionId(transactionIdParam);
      setStatus(statusParam);
      setShowPaymentStatus(true);
    }
  }, [searchParams]);

  const generateReferenceNo = () => {
    return Math.floor(Math.random() * 1000000000); // Generate random reference number
  };

  const generateEncryptedURL = async () => {
    if (!transactionAmount) {
      setError('Transaction Amount is required.');
      return;
    }

    setError('');
    setLoading(true);

    const referenceNo = generateReferenceNo();
    const mandatoryFields = `${referenceNo}|11|${transactionAmount}`;

    const requestBody = {
      merchantID: '386949',
      mandatoryFields,
      optionalFields: '',
      returnURL: 'https://khit.campusify.io/dashboard/return-url',
      referenceNo: referenceNo.toString(),
      subMerchantID: '11',
      transactionAmount,
      payMode: '9',
    };

    try {
      const response = await fetch(
        'https://osaw.in/v1/payment/api/encryption/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      setEncryptedURL(data.encryptedURL);

      console.log('Generated Payment Details:', {
        referenceNo,
        transactionAmount,
        encryptedURL: data.encryptedURL,
        requestBody,
      });
    } catch (error) {
      console.error('Failed to generate encrypted URL:', error);
      setError('Failed to generate encrypted URL.');
    } finally {
      setLoading(false);
    }
  };

  if (showPaymentStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
            Payment Status
          </h1>
          <p>Transaction ID: {transactionId}</p>
          <p>Status: {status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
          Encrypt ICICI Payment URL
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700">
            Transaction Amount
          </label>
          <input
            type="text"
            id="transactionAmount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Transaction Amount"
          />
        </div>
        <button
          onClick={generateEncryptedURL}
          disabled={loading}
          className={`w-full py-2 px-4 mb-4 text-white font-semibold rounded-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Encrypted URL'}
        </button>
        {encryptedURL && (
          <a
            href={encryptedURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Proceed to Payment
          </a>
        )}
      </div>
    </div>
  );
};

export default EncryptAndReturn;
