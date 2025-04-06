"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@/components/ui/table";
import { UserRound } from "lucide-react";
import { useEffect } from "react";

export default function UserInformation({ params }: { params: { id: string } }) {
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
            <BreadcrumbLink href="/administration">Administration</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>User Information</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-semibold">Admission Directory</h1>
      <div className="bg-white rounded shadow-md shadow-slate-600 w-full p-4 space-y-4">
        <h1 className="text-xl font-semibold">User Personal Information</h1>
        <section className="grid grid-flow-row grid-cols-8 gap-3">
          <Card className="col-span-1 shadow-md">
            <CardHeader className="items-center">Jane Doe</CardHeader>
            <CardContent className="flex justify-center">
              <UserRound size="10rem" className="rounded-full" />
            </CardContent>
          </Card>
          <Card className="col-span-7 shadow-md">
            <CardHeader>Personal Details</CardHeader>
            <CardContent>
              <Table></Table>
            </CardContent>
          </Card>
          <Card className="col-span-4 h-60 shadow-md">
            <CardHeader>History</CardHeader>
            <CardContent>
              <Table></Table>
            </CardContent>
          </Card>
          <Card className="col-span-4 h-60 shadow-md">
            <CardHeader>Status</CardHeader>
            <CardContent>
              <Table></Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
