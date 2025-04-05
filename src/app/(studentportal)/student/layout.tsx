import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal — UCPI Portal",
};

export default function AdmissionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
