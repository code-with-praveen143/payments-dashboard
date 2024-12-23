'use client'
import { useSearchParams } from 'next/navigation';

const ReturnUrl = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">
          Payment {success === 'true' ? 'Successful' : 'Failed'}
        </h1>
        <p className="mb-4 text-lg">
          {success === 'true'
            ? 'Thank you for your payment! Your transaction was successful.'
            : 'Unfortunately, your transaction could not be completed. Please try again or contact support.'}
        </p>
        <a
          href="/"
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
        >
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default ReturnUrl;
