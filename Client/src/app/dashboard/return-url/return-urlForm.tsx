// app/dashboard/return-url/ReturnURLForm.tsx
'use client';

import { useFormState } from 'react-dom';
import { handlePaymentResponse } from '../return-url/action';

export default function ReturnURLForm() {
  const [state, formAction] = useFormState(handlePaymentResponse, null);

  return (
    <div>
      <h1>Payment Response</h1>
      <form action={formAction}>
        {/* Hidden input fields for payment data */}
        <input type="hidden" name="Response Code" value="E000" />
        <input type="hidden" name="Unique Ref Number" value="250125218450718" />
        <input type="hidden" name="Service Tax Amount" value="0.00" />
        <input type="hidden" name="Processing Fee Amount" value="0.00" />
        <input type="hidden" name="Total Amount" value="1.00" />
        <input type="hidden" name="Transaction Amount" value="1" />
        <input type="hidden" name="Transaction Date" value="25-01-2025 15:52:11" />
        <input type="hidden" name="Payment Mode" value="UPI_ICICI" />
        <input type="hidden" name="SubMerchantId" value="11" />
        <input type="hidden" name="ReferenceNo" value="652311585" />
        <input type="hidden" name="ID" value="386949" />
        <input type="hidden" name="RS" value="534e29d91016f525a5e6130d9dcef7149ea84c71338eb4c1f812aa7465e3c5bddb5df824f70751f08e0ebde3fea8c734d44627aae06bd06fbed7bca165d7d110" />
        <input type="hidden" name="TPS" value="null" />
        <input type="hidden" name="mandatory fields" value="652311585|11|1" />
        <input type="hidden" name="optional fields" value="null" />
        <input type="hidden" name="RSV" value="d61b93f08e58515035c097fa1fe8dbfada4e1b3268c72b4ef80e24e1847b8687371a510ab981a2ec2c4a9cde40a4fb1cbbd19f887017f8e31759cc4cf2d50c9c" />

        <button type="submit">Submit Payment Response</button>
      </form>

      {state && (
        <div>
          <h2>Payment Data</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}