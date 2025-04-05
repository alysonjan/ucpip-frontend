"use client"

import { PatientProvider } from "@/context/PatientProvider";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Patients — UCPI Portal",
// };

export default function PatientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // return children;
  return (
    <PatientProvider>
      {children}
    </PatientProvider>
  );
}
