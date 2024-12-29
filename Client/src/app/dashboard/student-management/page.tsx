'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Toaster, useToaster } from "@/components/ui/toaster"
import { BASE_URL } from '@/app/utils/constants';
import profile from "@/utils/profile.jpeg"

const FeeDetailsUI = () => {
  const [fees, setFees] = useState([
    { type: 'College Fee', total: 43000, paid: 13000, due: 30000, selected: false },
    { type: 'Hostel Fee', total: 25000, paid: 20000, due: 5000, selected: false },
    { type: 'Bus Fee', total: 15000, paid: 10000, due: 5000, selected: false },
    { type: 'Library Fee', total: 5000, paid: 5000, due: 0, selected: false },
    { type: 'Lab Fee', total: 10000, paid: 8000, due: 2000, selected: false },
  ]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
  const { showToast } = useToaster();

  useEffect(() => {
    calculateTotal(fees);
    fetchPaymentHistory();
  }, []);

  const handleSelectFee = (index: number) => {
    const updatedFees = [...fees];
    updatedFees[index].selected = !updatedFees[index].selected;
    setFees(updatedFees);
    calculateTotal(updatedFees);
  };

  const calculateTotal = (updatedFees: any[]) => {
    const total = updatedFees.reduce((acc: any, fee: { due: any; }) => acc + fee.due, 0); // Calculate total due
    setTotalAmount(total);
  };
  

  const handleFeeInputChange = (index: number, value: string) => {
    const updatedFees = [...fees];
    const newTotal = parseInt(value, 10) || 0;
  
    updatedFees[index].due = Math.max(newTotal - updatedFees[index].paid, 0); // Update due dynamically
    updatedFees[index].total = newTotal;
  
    setFees(updatedFees);
    calculateTotal(updatedFees);
  };
  

  const handlePayNow = async () => {
    try {
      const selectedFees = fees.filter((fee) => fee.selected);
      const totalPayment = selectedFees.reduce((acc, fee) => acc + fee.total, 0);
  
      const payload = {
        studentId: userId,
        amount: totalPayment,
        gatewayName: 'ICICI Eazypay ',
        transactionId: `TXN_${Date.now()}`,
        yearSem: 'IV Semester',
        paymentType: selectedFees.map((fee) => fee.type).join(', '),
      };
  
      const response = await fetch(`${BASE_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        showToast(data.message, 'success');
        fetchPaymentHistory();
      } else {
        showToast(data.message || 'Failed to initiate payment', 'error');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      showToast('An error occurred while initiating payment.', 'error');
    }
  };
  
  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentHistory(data);
      } else {
        console.error('Error fetching payment history:', data.message);
        showToast('Failed to fetch payment history', 'warning');
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      showToast('An error occurred while fetching payment history', 'error');
    }
  };

  const formatDate = (isoTimestamp: any) => {
    const date = new Date(isoTimestamp); // Convert the ISO timestamp to a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed) and pad with 0 if needed
    const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year
  
    return `${day}/${month}/${year}`; // Format as dd/mm/yy
  }

  return (  
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src={profile}
                alt="Student Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">Manohar Kumar</h2>
                <p className="text-muted-foreground">Mechanical (2022 - 2026)</p>
                <p className="text-muted-foreground">Final Year - VIII Semester</p>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Register Number:</span> 61161911405</p>
              <p><span className="font-medium">E-mail:</span> manohar611@gmail.com</p>
              <p><span className="font-medium">Phone Number:</span> 9876543210</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Total Pending</p>
              <p className="text-2xl font-bold text-green-500">₹ {totalAmount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fees Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Fees Type</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.map((fee, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{fee.type}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={fee.total}
                        onChange={(e) => handleFeeInputChange(index, e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>₹ {fee.paid}</TableCell>
                    <TableCell>₹ {fee.due}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={fee.selected}
                        onCheckedChange={() => handleSelectFee(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <Button onClick={handlePayNow} className="mt-4">
            Pay Now
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Transaction Date</TableHead>
                  <TableHead>Fees Type</TableHead>
                  <TableHead>Receipt No</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment: any) => (
                  <TableRow key={payment._id} className='border-b border-gray-300'>
                    <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                    <TableCell>{payment.paymentType}</TableCell>
                    <TableCell>{payment._id}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>₹ {payment.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default FeeDetailsUI;

