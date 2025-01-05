'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReturnURL = () => {
  const searchParams = useSearchParams(); // Access query parameters
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // Function to handle data when passed via query params (GET method)
  const handleDataFromQuery = () => {
    const dataParam = searchParams.get('data'); // Get the "data" query parameter
    if (dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam)); // Ensure proper decoding
        setPaymentData(data);

        // Check payment status if transaction ID is available
        if (data.transactionId) {
          checkPaymentStatus(data.transactionId);
        }
      } catch (err) {
        console.error('Error parsing payment data from query:', err);
      }
    }
  };

  // Function to handle data when passed via POST (body data)
  const handleDataFromBody = async () => {
    try {
      const response = await fetch('/api/get-payment-data', { method: 'POST' });
      const data = await response.json();
      setPaymentData(data);

      // Check payment status if transaction ID is available
      if (data.transactionId) {
        checkPaymentStatus(data.transactionId);
      }
    } catch (err) {
      console.error('Error fetching payment data from body:', err);
    }
  };

  useEffect(() => {
    // Try fetching data from the query params (GET)
    handleDataFromQuery();
    
    // If there's no data in the query, try fetching it from POST request (fallback)
    if (!paymentData) {
      handleDataFromBody();
    }
  }, [searchParams]);

  const checkPaymentStatus = async (transactionId: string) => {
    try {
      const response = await fetch('/api/check-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }), // Send transaction ID to the API route
      });

      const result = await response.json();
      setPaymentStatus(result.status || 'Unknown');
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('Failed to verify payment status');
    }
  };

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
};

export default ReturnURL;
