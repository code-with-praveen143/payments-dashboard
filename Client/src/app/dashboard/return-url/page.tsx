'use client';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../components/payment-success.json';

const ReturnUrl = () => {
  const [showDetails, setShowDetails] = useState(false); // Toggle between animation and details
  const success = true; // Static successful payment for demo
  const orderId = 'ORD123456'; // Static order ID
  const transactionId = 'TXN987654321'; // Static transaction ID
  const message = 'Payment was successful. Thank you!'; // Static message
  const amount = '₹36,000'; // Static amount

  useEffect(() => {
    // Show details after 3 seconds (duration of animation)
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-fullrounded-lg shadow-lg p-6">
        {!showDetails ? (
          // Payment Successful Animation
          <div className="flex flex-col items-center justify-center text-center">
            <Lottie options={lottieOptions} height={200} width={200} />
            <h1 className="text-2xl font-bold mt-4">
              Payment Successful
            </h1>
            <p className="mt-2 text-gray-600">Please wait, loading your details...</p>
          </div>
        ) : (
          // Payment Details
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
              Payment Successful
            </h1>
            <p className="mb-4 text-lg text-center">
              Thank you for your payment! Your transaction was successful.
            </p>
            <div className="border-t border-b py-4 mb-6">
              <p className="mb-2">
                <strong>Order ID:</strong> {orderId}
              </p>
              <p className="mb-2">
                <strong>Transaction ID:</strong> {transactionId}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> {amount}
              </p>
              <p className="mb-2">
                <strong>Message:</strong> {message}
              </p>
            </div>
            <a
              href="/dashboard"
              className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-200 ease-in-out"
            >
              Go Back to Homepage
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ReturnUrl;
