// app/dashboard/return-url/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ReturnURL() {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch payment data from the API route
    const fetchPaymentData = async () => {
      try {
        const response = await fetch('/api/payment-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ /* Mock data for testing */ }),
        });

        const result = await response.json();
        setPaymentData(result.data);
        setPaymentStatus(result.message);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setPaymentStatus('Failed to fetch payment data');
      }
    };

    fetchPaymentData();
  }, []);

  if (!paymentData) {
    return <h1>Loading payment details...</h1>;
  }

  return (
    <div>
      <h1>Payment Response</h1>
      <pre>{JSON.stringify(paymentData, null, 2)}</pre>

      <h2>Payment Status</h2>
      <p>{paymentStatus || 'Checking status...'}</p>
    </div>
  );
}