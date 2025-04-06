import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents — UCPI Portal",
};

export default function DocumentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
