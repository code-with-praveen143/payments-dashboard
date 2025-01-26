import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Extract payment data from the request body
    const paymentData = await request.json();

    // Process the payment data (e.g., save to database, update order status, etc.)
    if (paymentData['Response Code'] === 'E000') {
      // Return a JSON response with the payment data
      return NextResponse.json({ status: 'success', data: paymentData }, { status: 200 });
    } else {
      // Return a JSON response with the payment data
      return NextResponse.json({ status: 'failed', data: paymentData }, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing payment data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}