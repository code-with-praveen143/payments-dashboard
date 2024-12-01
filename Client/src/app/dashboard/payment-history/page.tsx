import React from "react";

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

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4">
        {/* Header */}
        <h1 className="text-lg font-bold text-gray-700 mb-4">Payment History</h1>
        
        {/* Filter Buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <button className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:ring focus:ring-green-300">
            Fee Type
          </button>
          <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
            Year IV
          </button>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left text-sm">
            <thead>
              <tr className="bg-green-50 text-gray-600">
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
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-2 border border-gray-200">{row.transactionDate}</td>
                  <td className="p-2 border border-gray-200">{row.feesType}</td>
                  <td className="p-2 border border-gray-200">{row.receiptNo}</td>
                  <td className="p-2 border border-gray-200">{row.transactionId}</td>
                  <td className="p-2 border border-gray-200">{row.id}</td>
                  <td className="p-2 border border-gray-200">{row.paidIn}</td>
                  <td className="p-2 border border-gray-200">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Print Button */}
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
