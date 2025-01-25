'use client';
import { useEffect, useState } from 'react';

const ReturnURL = () => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    // Function to parse the POST request data
    const parsePostData = () => {
      // Create a hidden form to capture the POST data
      const form = document.createElement('form');
      form.method = 'POST';
      form.style.display = 'none';

      // Simulate the form submission with the POST data
      const postData = {
        MerchantId: '1234567890',
        TransactionId: '987654321',
        OrderId: 'ORDER12345',
        Amount: '1000.00',
        Currency: 'INR',
        PaymentMode: 'CC',
        ResponseCode: '0',
        ResponseMessage: 'Success',
        TransactionDate: '2023-10-15 12:34:56',
        BankTransactionId: 'ICICI123456789',
        Status: 'Success',
        Checksum: 'ABCDEF1234567890ABCDEF1234567890',
      };

      // Add hidden inputs to the form for each POST data field
      Object.entries(postData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Append the form to the document body and submit it
      document.body.appendChild(form);
      form.submit();

      // Extract the POST data from the form
      const formData = new FormData(form);
      const data: { [key: string]: any } = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Set the payment data in the state
      setPaymentData(data);

      // Check payment status if transaction ID is available
      if (data.TransactionId) {
        checkPaymentStatus(data.TransactionId);
      }
    };

    // Call the function to parse the POST data
    parsePostData();
  }, []);

  const checkPaymentStatus = async (transactionId: string) => {
    try {
      console.log('Checking payment status for transaction ID:', transactionId); // Log before API call
      const response = await fetch('/api/check-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }), // Send transaction ID to the API route
      });

      const result = await response.json();
      console.log('Payment Status API Response:', result); // Log the API response
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