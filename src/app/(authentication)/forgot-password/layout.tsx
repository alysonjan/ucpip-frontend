import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — UCPI Portal",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
