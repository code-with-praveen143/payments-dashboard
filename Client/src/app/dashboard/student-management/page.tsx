'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from '@/app/utils/constants';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

type FeeDetails = {
  total: number;
  paid: number;
  due: number;
};

type FeesStructure = {
  [feeType: string]: {
    [year: number]: FeeDetails;
  };
};

const FeeDetailsUI = () => {
  const [fees, setFees] = useState<FeesStructure>({
    'College Fee': {
      1: { total: 10000, paid: 7000, due: 3000 },
      2: { total: 11000, paid: 8000, due: 3000 },
      3: { total: 12000, paid: 9000, due: 3000 },
      4: { total: 13000, paid: 10000, due: 3000 },
    },
    'Hostel Fee': {
      1: { total: 8000, paid: 5000, due: 3000 },
      2: { total: 8500, paid: 6000, due: 2500 },
      3: { total: 9000, paid: 7000, due: 2000 },
      4: { total: 9500, paid: 8000, due: 1500 },
    },
    'Bus Fee': {
      1: { total: 5000, paid: 4000, due: 1000 },
      2: { total: 5500, paid: 4500, due: 1000 },
      3: { total: 6000, paid: 5000, due: 1000 },
      4: { total: 6500, paid: 5500, due: 1000 },
    },
  });

  const [dropdownState, setDropdownState] = useState<{
    feeType: string | null;
    year: number | null;
  }>({ feeType: null, year: null });

  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;

  const handleCustomPayment = async (feeType: string, year: number) => {
    if (!customAmount || customAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Step 1: Call the Payment API
      const paymentPayload = {
        studentId: userId,
        amount: customAmount,
        gatewayName: 'ICICI Eazypay',
        transactionId: `TXN_${Date.now()}`,
        yearSem: `${year} Year`,
        paymentType: feeType,
      };

      const paymentResponse = await fetch(`${BASE_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(paymentPayload),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Failed to process payment");
      }

      // Step 2: Call the Return URL API
      const returnUrlPayload = {
        'Response Code': 'E000', // Example success response
        'Unique Ref Number': `REF_${Date.now()}`,
        'Total Amount': customAmount,
        'Transaction Amount': customAmount,
        'Transaction Date': new Date().toLocaleString(),
        'Payment Mode': 'UPI_ICICI',
        'SubMerchantId': '11',
        'ReferenceNo': paymentPayload.transactionId,
        'ID': userId,
      };

      const returnUrlResponse = await fetch('/api/return-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnUrlPayload),
      });

      const returnUrlData = await returnUrlResponse.json();

      if (!returnUrlResponse.ok) {
        throw new Error(returnUrlData.message || "Failed to process return URL");
      }

      // Step 3: Redirect to the Return URL Page
      if (returnUrlData.status === 'success') {
        router.push(
          `/dashboard/return-url?status=success&data=${encodeURIComponent(
            JSON.stringify(returnUrlData.data)
          )}`
        );
      } else {
        throw new Error("Payment failed at the return URL stage");
      }

      // Update the UI
      const updatedFees = { ...fees };
      updatedFees[feeType][year].paid += customAmount;
      updatedFees[feeType][year].due -= customAmount;
      setFees(updatedFees);
      setDropdownState({ feeType: null, year: null });
      setCustomAmount(null);

      toast({
        title: "Success!",
        description: "Payment processed successfully.",
        variant: "default",
        className: "bg-green-500 text-white",
      });
    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error!",
        description: error.message || "An error occurred while processing payment",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {Object.entries(fees).map(([feeType, years]) => (
        <Card key={feeType}>
          <CardHeader>
            <CardTitle>{feeType}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Year</th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                    <th className="border border-gray-300 px-4 py-2">Paid</th>
                    <th className="border border-gray-300 px-4 py-2">Due</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(years).map(([year, details]) => (
                    <tr key={year} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">{`${year} Year`}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">₹{details.total}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">₹{details.paid}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">₹{details.due}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Button
                          onClick={() =>
                            setDropdownState(
                              dropdownState.feeType === feeType && dropdownState.year === Number(year)
                                ? { feeType: null, year: null }
                                : { feeType, year: Number(year) }
                            )
                          }
                          disabled={loading}
                        >
                          Pay
                        </Button>
                        {dropdownState.feeType === feeType && dropdownState.year === Number(year) && (
                          <div className="mt-2">
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              value={customAmount || ''}
                              onChange={(e) => setCustomAmount(Number(e.target.value))}
                              className="mb-2"
                              disabled={loading}
                            />
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleCustomPayment(feeType, Number(year))}
                                disabled={loading}
                              >
                                {loading ? "Processing..." : "Submit"}
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  setDropdownState({ feeType: null, year: null });
                                  setCustomAmount(null);
                                }}
                                disabled={loading}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
      <Toaster />
    </div>
  );
};

export default FeeDetailsUI;