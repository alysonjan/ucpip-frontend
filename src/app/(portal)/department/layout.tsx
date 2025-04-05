import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Departments — UCPI Portal",
};

export default function DeparmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
