// components/RevenueSummary.js
import { Heading } from "lucide-react";
import React from "react";

const RevenueSummary = () => {
  
  const cards = [
    { title: "Total Revenue", amount: "₹ 2,56,970", icon: "📈", color: "bg-green-100" },
    { title: "College Fees", amount: "₹ 1,38,000", icon: "🏫", color: "bg-red-100" },
    { title: "Bus Fees", amount: "₹ 68,000", icon: "🚌", color: "bg-orange-100" },
    { title: "Hostel Fees", amount: "₹ 93,970", icon: "🏢", color: "bg-indigo-100" },
    { title: "TNP Fees", amount: "₹ 40000", icon: "📘", color: "bg-red-100" },
  ];

  return (
    <>
      <h2 className="mb-4 text-[28px] text-[#656565] font-bold font-sans text-left">
        Revenue Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-4 rounded-lg ${card.color} shadow-md flex items-center`}
          >
            <div className="text-2xl mr-4">{card.icon}</div>
            <div>
              <h3 className="text-sm font-medium">{card.title}</h3>
              <p className="text-lg font-bold">{card.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RevenueSummary;
