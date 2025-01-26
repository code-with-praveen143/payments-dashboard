'use client'; // Mark the component as a Client Component

import { useEffect, useState } from 'react';

export default function ReturnURL() {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch payment data from the API route
    const fetchPaymentData = async () => {
      try {
        const response = await fetch('/api/return-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Mock payment data for testing
            "Response Code": "E000",
            "Unique Ref Number": "250125218450718",
            "Service Tax Amount": "0.00",
            "Processing Fee Amount": "0.00",
            "Total Amount": "1.00",
            "Transaction Amount": "1",
            "Transaction Date": "25-01-2025 15:52:11",
            "Payment Mode": "UPI_ICICI",
            "SubMerchantId": "11",
            "ReferenceNo": "652311585",
            "ID": "386949",
            "RS": "534e29d91016f525a5e6130d9dcef7149ea84c71338eb4c1f812aa7465e3c5bddb5df824f70751f08e0ebde3fea8c734d44627aae06bd06fbed7bca165d7d110",
            "TPS": "null",
            "mandatory fields": "652311585|11|1",
            "optional fields": "null",
            "RSV": "d61b93f08e58515035c097fa1fe8dbfada4e1b3268c72b4ef80e24e1847b8687371a510ab981a2ec2c4a9cde40a4fb1cbbd19f887017f8e31759cc4cf2d50c9c"
          }),
        });
        const result = await response.json();
        setPaymentData(result.data);
        setPaymentStatus(result.status);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError('Failed to fetch payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Payment Response
        </h1>

        {paymentStatus === 'success' && (
          <div>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
              <h2 className="font-bold text-xl">Payment Successful!</h2>
              <p>Your payment has been processed successfully.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(paymentData).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <h2 className="font-bold text-xl">Payment Failed!</h2>
            <p>There was an issue processing your payment.</p>
          </div>
        )}
      </div>
    </div>
  );
}