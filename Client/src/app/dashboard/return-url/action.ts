// app/dashboard/return-url/actions.ts
'use server';

export async function handlePaymentResponse(prevState: any, formData: FormData) {
  // Extract payment data from the form data
  const paymentData = {
    responseCode: formData.get('Response Code'),
    uniqueRefNumber: formData.get('Unique Ref Number'),
    serviceTaxAmount: formData.get('Service Tax Amount'),
    processingFeeAmount: formData.get('Processing Fee Amount'),
    totalAmount: formData.get('Total Amount'),
    transactionAmount: formData.get('Transaction Amount'),
    transactionDate: formData.get('Transaction Date'),
    paymentMode: formData.get('Payment Mode'),
    subMerchantId: formData.get('SubMerchantId'),
    referenceNo: formData.get('ReferenceNo'),
    id: formData.get('ID'),
    rs: formData.get('RS'),
    tps: formData.get('TPS'),
    mandatoryFields: formData.get('mandatory fields'),
    optionalFields: formData.get('optional fields'),
    rsv: formData.get('RSV'),
  };

  // Log the payment data
  console.log('Payment Data Received:', paymentData);

  // Process the payment data (e.g., save to database, update order status, etc.)
  if (paymentData.responseCode === 'E000') {
    console.log('Payment successful:', paymentData.uniqueRefNumber);
    return { success: true, message: 'Payment successful!', data: paymentData };
  } else {
    console.log('Payment failed:', paymentData.responseCode);
    return { success: false, message: 'Payment failed!', data: paymentData };
  }
}