import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — UCPI Portal",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
