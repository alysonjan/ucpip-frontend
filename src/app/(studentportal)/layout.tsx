"use client";

import { FileText, LayoutDashboard, LogOut, Settings, Shield, User, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-full">
      <nav className="bg-primary flex flex-col text-primary-foreground p-2 gap-4">
        <span className="flex flex-col items-center text-sm select-none">
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
          UCPI Portal
        </span>
        <ul className="flex flex-col list-none">
          {[{ label: "Patient", href: "/student", icon: <Users size={24} /> }].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex flex-col gap-1 p-1 rounded-sm items-center hover:bg-white/25">
                {item.icon}
                <span className="inline-flex leading-tight" style={{ fontSize: "0.65rem" }}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-col h-100 flex-1 items-center justify-center">{children}</main>
    </section>
  );
}
