import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home — UCPI Portal",
  description: "Welcome to the University Clinic Patient Information Portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("h-full overflow-hidden", inter.className)}>{children}</body>
    </html>
  );
}
