import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration — UCPI Portal",
};

export default function AdministrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
