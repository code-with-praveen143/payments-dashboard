"use client";
import Link from "next/link";
import { useState } from "react";

export default function EncryptURL() {
  const [encryptedURL, setEncryptedURL] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEncryptedURL = async () => {
    setLoading(true);
    const requestBody = {
      merchantID: "336933",
      mandatoryFields: "123456|11|100",
      optionalFields: "", // Example optional fields
      returnURL: "https://khit.campusify.io/dashboard/return-url",
      referenceNo: "12345",
      subMerchantID: "45",
      transactionAmount: 100,
      payMode: "9",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/encryption/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      setEncryptedURL(data.encryptedURL);
    } catch (error) {
      console.error("Failed to generate encrypted URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className=" shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
          Encrypt ICICI Payment URL
        </h1>
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
          <div className="text-center">
            <p className="text-green-700 mb-2 break-all">
              Encrypted URL Generated Successfully!
            </p>
            <Link
              href="/dashboard/return-url"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Proceed to Payment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
