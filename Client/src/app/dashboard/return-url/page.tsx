import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // If using Next.js for routing

// Define the types for payment data
interface PaymentData {
  transactionId: string;
  status: string;
  amount: string;
}

const ReturnURL = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { transactionId, status } = router.query;
    if (transactionId && status) {
      fetchPaymentData(transactionId as string, status as string);  // Typecasting as string
    }
  }, [router.query]);

  // Explicitly type the parameters
  const fetchPaymentData = async (transactionId: string, status: string) => {
    try {
      const response = await fetch('/api/payment/get-payment-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, status }),  // Pass transactionId and status
      });
      const data = await response.json();
      setPaymentData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment data:', error);
      setError('Failed to fetch payment data.');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p>{error}</p>}
      {paymentData && (
        <div>
          <p>Transaction ID: {paymentData.transactionId}</p>
          <p>Status: {paymentData.status}</p>
          <p>Amount: ${paymentData.amount}</p>
        </div>
      )}
    </div>
  );
};

export default ReturnURL;
