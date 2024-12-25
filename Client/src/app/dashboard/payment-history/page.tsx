'use client'
import React, { useState } from "react";

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

  const [feeType, setFeeType] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl shadow-md rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Payment History</h1>
          <button className="px-6 py-2 font-normal bg-blue-500 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
            Print
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-4">
            <select
              className="px-4 py-2 text-sm border rounded focus:ring focus:ring-green-300"
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
            >
              <option value="">Fee Type</option>
              <option value="college">College</option>
              <option value="hostel">Hostel</option>
              <option value="transport">Transport</option>
            </select>
            <select
              className="px-4 py-2 text-sm border rounded focus:ring focus:ring-green-300"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Year By</option>
              <option value="1">Year I</option>
              <option value="2">Year II</option>
              <option value="3">Year III</option>
              <option value="4">Year IV</option>
            </select>
            <select
              className="px-4 py-2 text-sm border rounded focus:ring focus:ring-green-300"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Semester By</option>
              <option value="1">Semester I</option>
              <option value="2">Semester II</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <table className="w-full border-collapse border text-left text-sm">
            <thead>
              <tr>
                <th className="p-2 border border-gray-200">Transaction Date</th>
                <th className="p-2 border border-gray-200">Fees Type</th>
                <th className="p-2 border border-gray-200">Receipt No</th>
                <th className="p-2 border border-gray-200">Transaction ID</th>
                <th className="p-2 border border-gray-200">ID</th>
                <th className="p-2 border border-gray-200">Paid in</th>
                <th className="p-2 border border-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="p-2 border border-gray-200">
                    {row.transactionDate}
                  </td>
                  <td className="p-2 border border-gray-200">{row.feesType}</td>
                  <td className="p-2 border border-gray-200">{row.receiptNo}</td>
                  <td className="p-2 border border-gray-200">
                    {row.transactionId}
                  </td>
                  <td className="p-2 border border-gray-200">{row.id}</td>
                  <td className="p-2 border border-gray-200">{row.paidIn}</td>
                  <td className="p-2 border border-gray-200">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
