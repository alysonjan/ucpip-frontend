import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperAdmin Login — UCPI Portal",
};

export default function SuperAdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
