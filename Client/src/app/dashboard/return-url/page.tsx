"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_SHA512_KEY } from "@/app/utils/constants";
import CryptoJS from "crypto-js";

interface TransactionDetails {
  responseCode?: string;
  uniqueRefNumber?: string;
  transactionAmount?: string;
  totalAmount?: string;
  transactionDate?: string;
  paymentMode?: string;
  subMerchantId?: string;
  referenceNo?: string;
  status?: string;
  rs?: string;
}

const generateSHA512Hash = (details: TransactionDetails, secretKey: string): string => {
  const hashString = `${details.subMerchantId}|${details.responseCode}|${details.uniqueRefNumber}|${details.transactionAmount}|${secretKey}`;
  return CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
};

const ReturnURL = () => {
  const searchParams = useSearchParams(); // Use useSearchParams for query params
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (searchParams) {
      // Extract query parameters using searchParams.get()
      const details: TransactionDetails = {
        responseCode: searchParams.get("responseCode") || undefined,
        uniqueRefNumber: searchParams.get("uniqueRefNumber") || undefined,
        transactionAmount: searchParams.get("transactionAmount") || undefined,
        totalAmount: searchParams.get("totalAmount") || undefined,
        transactionDate: searchParams.get("transactionDate") || undefined,
        paymentMode: searchParams.get("paymentMode") || undefined,
        subMerchantId: searchParams.get("subMerchantId") || undefined,
        referenceNo: searchParams.get("referenceNo") || undefined,
        status: searchParams.get("status") || undefined,
        rs: searchParams.get("rs") || undefined,
      };

      setTransactionDetails(details);

      // Validate the response using SHA512 signature
      const isValid = verifyResponse(details);
      setIsVerified(isValid);
    }
  }, [searchParams]);

  const verifyResponse = (details: TransactionDetails): boolean => {
    const secretKey = NEXT_PUBLIC_SHA512_KEY; // Your secret key
    const generatedHash = generateSHA512Hash(details, secretKey);
    return generatedHash === details.rs;
  };

  const getMessage = (responseCode?: string): string => {
    switch (responseCode) {
      case "E000":
        return "Transaction Successful!";
      case "E0035":
      case "E007":
        return "Transaction Failed. Please try again.";
      case "E003":
        return "Transaction Aborted by User.";
      default:
        return "Unknown response. Please contact support.";
    }
  };

  if (!transactionDetails) {
    return <p>Loading transaction details...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      {isVerified ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold text-green-700">
            {getMessage(transactionDetails.responseCode)}
          </h2>
          <ul className="mt-4 text-left text-gray-700">
            <li><strong>Transaction ID:</strong> {transactionDetails.uniqueRefNumber}</li>
            <li><strong>Reference No:</strong> {transactionDetails.referenceNo}</li>
            <li><strong>Amount:</strong> ₹{transactionDetails.transactionAmount}</li>
            <li><strong>Total Amount:</strong> ₹{transactionDetails.totalAmount}</li>
            <li><strong>Date:</strong> {transactionDetails.transactionDate}</li>
            <li><strong>Payment Mode:</strong> {transactionDetails.paymentMode}</li>
          </ul>
          <div className="mt-6">
            <a
              href="/"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Return to Home
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold text-red-700">Verification Failed</h2>
          <p className="text-gray-700 mt-2">
            The response could not be verified. Please contact support.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Return to Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnURL;
