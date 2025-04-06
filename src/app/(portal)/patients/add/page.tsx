"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect } from "react";
import AddPatientForm from "./form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddPatient() {
  useEffect(() => {
    document.title = "";
  });
  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/admissions">
                    Admissions
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/patients">
                    Patients
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/administration">
                    Administration
                  </BreadcrumbLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Add</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-2">
        <h1 className="text-xl font-semibold">New Patient</h1>
        <Link href="/patients">
          <Button>Back</Button>
        </Link>
      </div>

      <div className="bg-white rounded shadow-md  w-full ">
        <AddPatientForm />
      </div>
    </section>
  );
}
