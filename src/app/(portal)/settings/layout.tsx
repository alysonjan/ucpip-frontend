import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — UCPI Portal",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
