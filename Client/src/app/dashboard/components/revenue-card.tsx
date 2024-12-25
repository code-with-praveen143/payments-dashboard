// components/RevenueSummary.js
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
    <div className="max-w-full px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <h2 className="mb-6 text-2xl sm:text-3xl font-bold font-sans text-left text-primary">
        Revenue Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-5 rounded-xl ${card.color} shadow-lg transition-transform transform hover:scale-105 flex items-center text-black font-bold`}
          >
            <div className="text-3xl sm:text-4xl mr-4">{card.icon}</div>
            <div>
              <h3 className="text-sm sm:text-base font-medium">{card.title}</h3>
              <p className="text-lg sm:text-xl">{card.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueSummary;
