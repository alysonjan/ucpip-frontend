import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage — UCPI Portal",
};

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
