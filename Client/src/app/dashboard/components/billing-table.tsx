// components/BillingTable.js
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const BillingTable = () => {
  const data = [
    {
      sNo: "01",
      regNo: "6116119401",
      name: "Manohar",
      receiptNo: "COL_116",
      feesType: "Sem-II",
      transactionId: "2648934586",
      date: "09/01/2025",
      amount: "₹ 28,000",
    },
    {
      sNo: "02",
      regNo: "6116119501",
      name: "Nithish Kumar",
      receiptNo: "BUS_166",
      feesType: "Sem-III",
      transactionId: "2645674586",
      date: "09/01/2025",
      amount: "₹ 12,000",
    },
    // Add more mock data here
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-primary">Recent Billing</h2>
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[800px] border-collapse border text-left text-sm lg:text-base">
          <TableHeader>
            <TableRow className="bg-gray-100 font-semibold">
              <TableHead className="border border-gray-300 px-4 py-2">S.No</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Register Number</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Student Name</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Receipt No</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Fees Type</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Transaction ID</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Transaction Date</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50 transition-all">
                <TableCell className="border border-gray-300 px-4 py-2">{row.sNo}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.regNo}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.name}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.receiptNo}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.feesType}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.transactionId}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.date}</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BillingTable;
