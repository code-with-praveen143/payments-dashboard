"use client";
import { useState } from "react";

export default function EncryptAndReturnURL() {
  const [encryptedURL, setEncryptedURL] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<any | null>(null);

  const ICICI_ENCRYPTION_KEY = "3844841769401000"; // Directly integrated for simplicity (use env variable in production)

  const generateReferenceNo = () => Math.floor(Math.random() * 1000000000);

  const generateEncryptedURL = async () => {
    if (!transactionAmount) {
      setError("Transaction Amount is required.");
      return;
    }

    setError(""); // Clear error
    setLoading(true);

    const referenceNo = generateReferenceNo();
    const mandatoryFields = `${referenceNo}|11|${transactionAmount}`;

    const requestBody = {
      merchantID: "386949",
      mandatoryFields,
      optionalFields: "",
      returnURL: "https://khit.campusify.io/dashboard/payment-gateway",
      referenceNo: referenceNo.toString(),
      subMerchantID: "11",
      transactionAmount,
      payMode: "9",
      encryptionKey: ICICI_ENCRYPTION_KEY, // Include key
    };

    try {
      const response = await fetch(
        "https://osaw.in/v1/payment/api/encryption/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (!data.encryptedURL) throw new Error("Failed to fetch encrypted URL.");

      setEncryptedURL(data.encryptedURL);

      // Simulate fetching payment data
      const paymentDetails = {
        transactionId: referenceNo.toString(),
        status: "Pending",
        amount: transactionAmount,
      };
      setPaymentData(paymentDetails);
    } catch (error) {
      console.error("Failed to generate encrypted URL:", error);
      setError("Failed to generate encrypted URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className="shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
          Encrypt ICICI Payment URL
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="transactionAmount"
            className="block text-sm font-medium text-gray-700"
          >
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
          className={`w-full py-2 px-4 mb-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
          }`}
        >
          {loading ? "Generating..." : "Generate Encrypted URL"}
        </button>

        {encryptedURL && (
          <>
            <a
              href={encryptedURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Proceed to Payment
            </a>

            {paymentData && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">Payment Details:</h2>
                <p>Transaction ID: {paymentData.transactionId}</p>
                <p>Status: {paymentData.status}</p>
                <p>Amount: ${paymentData.amount}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
