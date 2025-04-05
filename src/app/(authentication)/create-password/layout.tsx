import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Password — UCPI Portal",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
