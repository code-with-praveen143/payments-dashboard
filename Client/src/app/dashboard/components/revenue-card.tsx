// components/RevenueSummary.js
import { Heading } from "lucide-react";
import React from "react";

const RevenueSummary = () => {
  
  const cards = [
    { title: "Total Revenue", amount: "₹ 2,56,70", icon: "📈", color: "bg-green-100" },
    { title: "College Fees", amount: "₹ 1,38,000", icon: "🏫", color: "bg-red-100" },
    { title: "Bus Fees", amount: "₹ 68,000", icon: "🚌", color: "bg-orange-100" },
    { title: "Hostel Fees", amount: "₹ 93,970", icon: "🏢", color: "bg-indigo-100" },
    { title: "TNP Fees", amount: "₹ 40", icon: "📘", color: "bg-red-100" },
  ];

  return (
    <div className="max-w-full overflow-x-hidden"> 
      <h2 className="mb-4 text-[28px] font-bold font-sans text-left">
        Revenue Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-4 rounded-lg ${card.color} shadow-md flex items-center text-black font-bold`}
          >
            <div className="text-2xl mr-4">{card.icon}</div>
            <div>
              <h3 className="text-sm font-medium">{card.title}</h3>
              <p className="text-lg ">{card.amount}</p>
            </div>
          </div>
        ))}
      </div>
   </div>
  );
};

export default RevenueSummary;
