"use client";

import { useRouter } from "next/navigation"; // Use the router to navigate programmatically
import {
  FileText,
  LayoutDashboard,
  Shield,
  User,
  UserPlus,
  Users,
  Building2,
  ChevronDown,
  LogOut,
  UserCog,
  Contact2Icon,
  Settings2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const [fullname, setFullname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.removeItem("fullname");
        localStorage.removeItem("role");
        router.push("/signin");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userProfile = () => {
    router.push("/profile");
  };

  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname");
    const storedRole = localStorage.getItem("role");

    if (storedFullname) {
      setFullname(storedFullname);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <section className="flex h-full">
      <nav className="bg-primary flex flex-col text-primary-foreground p-2 gap-4">
        <span className="flex flex-col items-center text-sm select-none">
          <Image priority src="/logo.png" alt="Logo" width={64} height={64} />
          UCPI Portal
        </span>
        <ul className="flex flex-col list-none">
          {[
            {
              label: "Dashboard",
              href: "/dashboard",
              icon: <LayoutDashboard size={24} />,
            },
            { label: "Patients", href: "/patients", icon: <Users size={24} /> },
            {
              label: "Consultation",
              href: "/admissions",
              icon: <UserPlus size={24} />,
            },
            {
              label: "Documents",
              href: "/documents",
              icon: <FileText size={24} />,
            },
            {
              label: "Department",
              href: "/department",
              icon: <Building2 size={24} />,
            },

            ...(role === "super_admin" || role === "admin"
              ? [
                  {
                    label: "Administration",
                    href: "/administration",
                    icon: <Shield size={24} />,
                  },
                  {
                    label: "Doctors",
                    href: "/doctors",
                    icon: <Contact2Icon size={24} />,
                  },
                  {
                    label: "Settings",
                    href: "/others",
                    icon: <Settings2 size={24} />,
                  },
                ]
              : []),
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col gap-1 p-1 rounded-sm items-center ${
                  pathname.startsWith(item.href)
                    ? "bg-[#E85A67] text-white" // Dark grey background with white text for active state
                    : "hover:bg-[#990000] text-white" // Maroon hover with white text for non-active state
                }`}
              >
                {item.icon}
                <span className="inline-flex leading-tight" style={{ fontSize: "0.65rem" }}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {/* <hr className="mt-auto w-3/5 self-center" />
        <ul className="flex flex-col list-none items-center justify-center">
          {[
            { label: "Profile", href: "#", icon: <User />, onClick: userProfile },
            // {
            //   label: `Log out ${fullname ? fullname : ""}`, // Proper concatenation
            //   href: "#",
            //   icon: <LogOut />,
            //   onClick: handleLogout, // Call logout handler on click
            // },
          ].map((item) => (
            <li key={item.label}>
              <button
                onClick={item.onClick}
                className="flex flex-col gap-1 p-1 rounded-sm items-center hover:bg-white/25"
              >
                {item.icon}
                <span className="inline-flex leading-tight" style={{ fontSize: "0.65rem" }}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul> */}
      </nav>
      {/* <main className="flex flex-col h-100 flex-1 items-center justify-center">{children}</main> */}
      <div className="absolute top-4 right-4">
        {/* <button
          onClick={userProfile}
          className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-700"
        >
          <User className="w-5 h-5" />
          {fullname ? fullname : ""}
        </button> */}

        <Button
          className="flex items-center gap-2"
          onClick={toggleDropdown} // Toggle dropdown on click
        >
          <User className="w-6 h-6" /> {fullname ? fullname : ""} <ChevronDown />
        </Button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border p-2 w-40">
            <button
              className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-300 rounded p-1"
              onClick={userProfile}
            >
              <UserCog className="w-4 h-4" />
              Profile
            </button>
            <button
              className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-300 rounded p-1"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex flex-col h-100 flex-1 items-center justify-center">{children}</main>
    </section>
  );
}
