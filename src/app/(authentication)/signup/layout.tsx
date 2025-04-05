import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up — UCPI Portal",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
