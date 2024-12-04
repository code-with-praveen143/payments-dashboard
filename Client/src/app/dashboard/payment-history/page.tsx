import React from "react";
import DataTable from 'react-data-table-component';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentHistory = () => {
  const data = [
    {
      transactionDate: "03/01/2025",
      feesType: "College- IV",
      receiptNo: "COL_116",
      transactionId: "2648934586",
      id: "24086",
      paidIn: "Counter",
      amount: "₹36,000",
    },
    {
      transactionDate: "20/04/2024",
      feesType: "College- IV",
      receiptNo: "COL_116",
      transactionId: "1083567825",
      id: "09123",
      paidIn: "Online",
      amount: "₹26,000",
    },
  ];

  const columns = [
    {
      name: 'Transaction Date',
      selector: (row: { transactionDate: any; }) => row.transactionDate,
      sortable: true,
    },
    {
      name: 'Fees Type',
      selector: (row: { feesType: any; }) => row.feesType,
      sortable: true,
    },
    {
      name: 'Receipt No',
      selector: (row: { receiptNo: any; }) => row.receiptNo,
      sortable: true,
    },
    {
      name: 'Transaction ID',
      selector: (row: { transactionId: any; }) => row.transactionId,
      sortable: true,
    },
    {
      name: 'ID',
      selector: (row: { id: any; }) => row.id,
      sortable: true,
    },
    {
      name: 'Paid in',
      selector: (row: { paidIn: any; }) => row.paidIn,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: { amount: any; }) => row.amount,
      sortable: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f0fdf4',
        color: '#374151',
      },
    },
    rows: {
      style: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#ffffff',
        },
        '&:nth-of-type(even)': {
          backgroundColor: '#f9fafb',
        },
      },
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <div className="flex justify-end gap-4">
            <Button variant="outline">Fee Type</Button>
            <Button variant="outline">Year IV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
            striped
          />
          <div className="flex justify-center mt-4">
            <Button onClick={handlePrint}>Print</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;

