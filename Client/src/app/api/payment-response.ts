// pages/api/payment-response.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract payment data from the request body
    const paymentData = req.body;

    // Log the payment data
    console.log('Payment Data Received:', paymentData);

    // Process the payment data (e.g., save to database, update order status, etc.)
    if (paymentData.responseCode === 'E000') {
      console.log('Payment successful:', paymentData.uniqueRefNumber);
      res.status(200).json({ success: true, message: 'Payment successful!', data: paymentData });
    } else {
      console.log('Payment failed:', paymentData.responseCode);
      res.status(400).json({ success: false, message: 'Payment failed!', data: paymentData });
    }
  } else {
    // Handle non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}