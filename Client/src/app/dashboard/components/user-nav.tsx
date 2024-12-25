"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  UserCog,
  CalendarRange,
  Bus,
  Users,
  Banknote,
  Link2,
  Landmark,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Bell, LogOut, User, Sun, Moon, Menu } from "lucide-react";
import logo from "../../../utils/logo.png";
import { storedUsername, storedEmail, auth_token, role } from "@/app/@types/data";

const allNavItems = [
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
    icon: CalendarRange,
  },
  {
    title: "Bus Fee",
    href: "/dashboard/bus-fee",
    icon: Bus,
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
  },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

const NotificationBell = () => (
  <Button variant="ghost" size="icon" className="relative">
    <Bell className="h-5 w-5" />
    <span className="sr-only">Notifications</span>
  </Button>
);

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;
  const [windowWidth, setWindowWidth] = React.useState(isMobile);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    router.push("/");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
  };

  const getLogoutText = () => {
    return auth_token ? "Logout" : "Login";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const getFilteredNavItems = () => {
    
      if (role === "student") {
        return allNavItems.filter((item) =>
          ["Dashboard", "Students", "Payment History"].includes(item.title)
        );
      } else if (role === "admin") {
        return allNavItems.filter((item) => !["Students"].includes(item.title));
      } else if (role === "accountant") {
        return allNavItems.filter(
          (item) => !["Students", "User Management"].includes(item.title)
        );
      
    }

    return allNavItems;
  };

  const filteredNavItems = getFilteredNavItems();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto relative">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none lg:flex-1">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {!windowWidth && (
              <>
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder-avatar.jpg"
                          alt={username}
                        />
                        <AvatarFallback>{getInitials(username)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push("/dashboard/student-management")
                        }
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className={`${
                        auth_token
                          ? "text-red-600 dark:text-red-400"
                          : ""
                      }`}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{getLogoutText()}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {windowWidth && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt={username}
                      />
                      <AvatarFallback>{getInitials(username)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push("/dashboard/student-management")
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      <span>Theme</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <NavigationMenu.Root className="lg:hidden">
        <NavigationMenu.List
          className={`
            fixed w-full bg-background border-b z-40 shadow-lg transition-transform duration-300 ease-in-out overflow-x-hidden
            ${isOpen ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <nav className="container max-w-screen-2xl mx-auto flex flex-col p-4">
            {filteredNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start mb-1"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
}
