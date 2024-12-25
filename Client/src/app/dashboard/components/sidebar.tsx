"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bus, LayoutDashboard, UserCog, Wallet, Users, Banknote, Link2, Landmark } from 'lucide-react';
import { role } from "@/app/@types/data";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/dashboard/user-management",
    icon: UserCog,
  },
  {
    title: "Fee Structure",
    href: "/dashboard/fee-structure",
    icon: Wallet,
  },
  {
    title: "Bus Fee",
    href: "/dashboard/bus-fee",
    icon: Bus
  },
  {
    title: "Students",
    href: "/dashboard/student-management",
    icon: Users,
  },
  {
    title: "Payment History",
    href: "/dashboard/payment-history",
    icon: Banknote,
  },
  {
    title: "Current Batch",
    href: "/dashboard/current-batch",
    icon: Users,
  },
  {
    title: "Return URL",
    href: "/dashboard/return-url",
    icon: Link2,
  },
  {
    title: "Payment Gateway",
    href: "/dashboard/payment-gateway",
    icon: Landmark,
  }
];

export function Sidebar() {
  const pathname = usePathname();

  const filteredNavItems = sidebarNavItems.filter(item => {    
    if (role === "student") {
      return ["Dashboard", "Students", "Payment History"].includes(item.title);
    } else if (role === "admin") {
      return !["Students"].includes(item.title);
    } else if (role === "accountant") {
      return !["Students", "User Management"].includes(item.title);
    }
    return true; // Show all items for other roles or if role is not set
  });

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-4 py-8">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-secondary hover:bg-secondary/80"
                      : "hover:bg-secondary/10"
                  )}
                  asChild
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

