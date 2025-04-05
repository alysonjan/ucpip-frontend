import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions — UCPI Portal",
};

export default function AdmissionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
