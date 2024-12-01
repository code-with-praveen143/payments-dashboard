import React from "react";

const FeeDetailsUI = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Student Info and Summary Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
          {/* Left Section: Student Info */}
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/80" // Replace with actual image URL
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">Manohar Kumar</h2>
              <p className="text-gray-600">Mechanical (2022 - 2026)</p>
              <p className="text-gray-600">Final Year - VIII Semester</p>
            </div>
          </div>
          {/* Right Section: Student Info */}
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Register Number :</strong> 61161911405
            </p>
            <p className="text-gray-700">
              <strong>E-mail :</strong> manohar611@gmail.com
            </p>
            <p className="text-gray-700">
              <strong>Phone Number :</strong> 9876543210
            </p>
          </div>
          {/* Total Pending */}
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Pending</p>
            <h3 className="text-2xl font-bold text-green-500">₹ 58,500</h3>
          </div>
        </div>
      </div>

      {/* Fees Details Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Fees Type</th>
              <th className="p-4">Year</th>
              <th className="p-4">Semester</th>
              <th className="p-4">Total</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Due</th>
              <th className="p-4">Select here</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">College</td>
              <td className="p-4">Year IV</td>
              <td className="p-4">Sem - VII</td>
              <td className="p-4">₹ 43,000</td>
              <td className="p-4">₹ 43,000</td>
              <td className="p-4">₹ 0</td>
              <td className="p-4 text-center">
                <input type="checkbox" className="form-checkbox h-5 w-5" />
              </td>
            </tr>
            {/* Repeat rows */}
          </tbody>
        </table>
        <div className="text-right mt-4">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Pay Now
          </button>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">Payment History</h3>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Transaction Date</th>
              <th className="p-4">Fees Type</th>
              <th className="p-4">Receipt No</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">ID</th>
              <th className="p-4">Paid in</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">03/01/2025</td>
              <td className="p-4">College - VIII</td>
              <td className="p-4">COL_116</td>
              <td className="p-4">2648934586</td>
              <td className="p-4">24086</td>
              <td className="p-4">Counter</td>
              <td className="p-4 text-green-500">₹ 36,000</td>
            </tr>
            {/* Repeat rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeDetailsUI;
