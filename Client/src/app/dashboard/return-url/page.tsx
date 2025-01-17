"use client";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  number: string;
  amount: string;
}

export default function ReturnPage() {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData") || "null");
    setFormData(data);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className="shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary">
          Return URL Page
        </h1>

        {formData ? (
          <div>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Number:</strong> {formData.number}
            </p>
            <p>
              <strong>Amount:</strong> {formData.amount}
            </p>
          </div>
        ) : (
          <p>No data found </p>
        )}
      </div>
    </div>
  );
}
