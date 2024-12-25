'use client';
import React, { useEffect, useState } from 'react';
import profile from '@/utils/profile.jpeg';
import dynamic from 'next/dynamic';

const ClientSideImage = dynamic(() => import('next/image'), { ssr: false });

const FeeDetailsUI = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Student Info and Summary Section */}
      <div className="shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
          {/* Left Section: Student Info */}
          <div className="flex items-center gap-4">
            {isClient && (
              <ClientSideImage
                src={profile}
                alt="Student Profile"
                className="w-20 h-20 rounded-full object-cover"
                priority
              />
            )}
            <div>
              <h2 className="text-xl font-bold">Manohar Kumar</h2>
              <p className="font-normal">Mechanical (2022 - 2026)</p>
              <p className="font-normal">Final Year - VIII Semester</p>
            </div>
          </div>
          {/* Right Section: Contact Info */}
          <div className="space-y-2 text-sm sm:text-base">
            <p>
              <strong>Register Number:</strong> 61161911405
            </p>
            <p>
              <strong>E-mail:</strong> manohar611@gmail.com
            </p>
            <p>
              <strong>Phone Number:</strong> 9876543210
            </p>
          </div>
          {/* Total Pending Section */}
          <div className="text-center  rounded-lg p-4">
            <p className="text-sm">Total Pending</p>
            <h3 className="text-2xl font-bold text-green-500">₹ 58,500</h3>
          </div>
        </div>
      </div>

      {/* Fees Details Section */}
      <div className="shadow-lg rounded-lg p-6 mb-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4 text-primary">Fees Details</h3>
        <table className="w-full text-sm text-left">
          <thead className="uppercase text-xs">
            <tr>
              <th className="p-4">Fees Type</th>
              <th className="p-4">Year</th>
              <th className="p-4">Semester</th>
              <th className="p-4">Total</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Due</th>
              <th className="p-4 text-center">Select</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-b">
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
            {/* Repeat rows as needed */}
          </tbody>
        </table>
        <div className="text-right mt-4">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
            Pay Now
          </button>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="shadow-lg rounded-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4 text-primary">Payment History</h3>
        <table className="w-full text-sm text-left">
          <thead className="uppercase text-xs">
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
            {/* Repeat rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeDetailsUI;
