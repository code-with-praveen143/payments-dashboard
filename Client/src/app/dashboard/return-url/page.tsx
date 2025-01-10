"use client"; // Ensures this is a client component

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use next/navigation for the app directory

interface PaymentData {
  transactionId: string;
  status: string;
  amount: string;
}

const ReturnURL = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams(); // Use next/navigation

  useEffect(() => {
    const transactionId = searchParams.get("transactionId");
    const status = searchParams.get("status");

    if (transactionId && status) {
      fetchPaymentData(transactionId, status);
    } else {
      setLoading(false);
      setError("Missing transaction details in the URL.");
    }
  }, [searchParams]);

  const fetchPaymentData = async (transactionId: string, status: string) => {
    try {
      const response = await fetch("/api/payment/get-payment-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment data.");
      }

      const data = await response.json();
      setPaymentData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setError("Failed to fetch payment data.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {paymentData ? (
        <div>
          <p>Transaction ID: {paymentData.transactionId}</p>
          <p>Status: {paymentData.status}</p>
          <p>Amount: ${paymentData.amount}</p>
        </div>
      ) : (
        <p>No payment data available.</p>
      )}
    </div>
  );
};

export default ReturnURL;
