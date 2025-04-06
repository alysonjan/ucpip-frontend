import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors — UCPI Portal",
};

export default function DoctorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
