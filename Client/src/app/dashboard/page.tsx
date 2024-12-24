// pages/dashboard.js
import React from "react";
import { Sidebar } from "./components/sidebar";
import BillingTable from "./components/billing-table";
import RevenueSummary from "./components/revenue-card";


export default function Dashboard() {
  return (
    <div className="flex ">  
      {/* Main Content */}
      <div className="flex-1 p-6">
        <RevenueSummary />
        <BillingTable />
      </div>
    </div>
  );
}
