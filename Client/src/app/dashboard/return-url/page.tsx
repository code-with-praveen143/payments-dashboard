"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ReturnURL() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { status, transactionId } = router.query;

    if (status && transactionId) {
      setStatus(status as string);
      setTransactionId(transactionId as string);

      // You can add logic here, such as updating the transaction in your database
      setMessage("Payment processed successfully!");
    } else {
      setMessage("No transaction data found.");
    }
  }, [router.query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
          Payment Status
        </h1>

        {message && <p className="text-center text-lg mb-4">{message}</p>}

        {transactionId && (
          <div>
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
