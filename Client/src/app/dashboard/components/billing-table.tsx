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
    <div>
      <h2 className="text-[28px] font-[800px] font-[sans serif] mb-4">Recent Billing</h2>
      <div className="max-w-fit overflow-x-scroll">
        <Table className="w-full min-w-[800px] border-collapse border text-left text-sm">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className="border border-gray-300 p-2">S.No</TableHead>
              <TableHead className="border border-gray-300 p-2">Register Number</TableHead>
              <TableHead className="border border-gray-300 p-2">Student Name</TableHead>
              <TableHead className="border border-gray-300 p-2">Receipt No</TableHead>
              <TableHead className="border border-gray-300 p-2">Fees Type</TableHead>
              <TableHead className="border border-gray-300 p-2">Transaction ID</TableHead>
              <TableHead className="border border-gray-300 p-2">Transaction Date</TableHead>
              <TableHead className="border border-gray-300 p-2">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="border border-gray-300 p-2">{row.sNo}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.regNo}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.name}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.receiptNo}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.feesType}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.transactionId}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.date}</TableCell>
                <TableCell className="border border-gray-300 p-2">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BillingTable;
