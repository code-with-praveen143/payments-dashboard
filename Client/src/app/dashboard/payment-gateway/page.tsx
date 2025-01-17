"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js routing

// Define types for the payment details
interface PaymentData {
  name: string;
  number: string;
  amount: string;
}

export default function PaymentGatewayPage() {
  const [formData, setFormData] = useState<PaymentData>({
    name: "",
    number: "",
    amount: "",
  });

  const router = useRouter(); // Initialize Next.js router

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data to localStorage (optional)
    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Payment data saved successfully!");
    // Redirect to another page
    router.push("/dashboard/return-url"); // Replace "/success" with your desired route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-lg bg-white">
        <h1 className="text-2xl font-semibold text-center text-primary mb-4">
          Payment Gateway
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Payment Data
          </button>
        </form>
      </div>
    </div>
  );
}
