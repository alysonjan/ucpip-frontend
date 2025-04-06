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
import { Card, CardContent } from "@/components/ui/card";
import NewUserForm from "./form";

export default function AddUserAdministration({ params }: { params: { id: string } }) {

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
              <BreadcrumbLink>Create User</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      <h1 className="text-xl font-semibold">User Form</h1>
      <div className="bg-gray-200 rounded shadow-md shadow-slate-600 w-1/3 p-4 space-y-4">
        <section className="grid grid-flow-row grid-cols-8 gap-3  ">
          <Card className="col-span-8 h-100 overflow-auto bg-gray-200 ">
            <CardContent className="mt-4 ">
                <NewUserForm />
            </CardContent>
          </Card>
          <div className="flex flex-row mt-14">
          </div>
        </section>
      </div>
    </section>
  );
}
