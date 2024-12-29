"use client";

import { useSearchParams } from "next/navigation";

const ReturnURL = () => {
  const searchParams = useSearchParams();
  
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transactionId") || "N/A";
  const amount = searchParams.get("amount") || "N/A";
  const date = searchParams.get("date") || "N/A";
  const message = searchParams.get("message") || "N/A";

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        {status === "success" ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>
            <p className="text-gray-700">Thank you for your payment. Here are the details:</p>
            <div className="mt-4 text-left">
              <p className="text-sm text-gray-600">
                <strong>Transaction ID:</strong> {transactionId}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> ₹{amount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Message:</strong> {message}
              </p>
            </div>
          </div>
        ) : status === "failure" ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
            <p className="text-gray-700">Unfortunately, your payment was not successful. Please try again.</p>
            <div className="mt-4 text-left">
              <p className="text-sm text-gray-600">
                <strong>Transaction ID:</strong> {transactionId}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> ₹{amount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Message:</strong> {message}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-700">Loading Payment Status...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnURL;
