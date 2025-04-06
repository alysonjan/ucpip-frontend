"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
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
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

type UserTypes = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  active: number;
};

type UserStatuses = {
  [id: number]: boolean;
};

const fetchPatients = async (): Promise<UserTypes[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

// test

export default function Administration() {
  const [allUsers, setAllUsers] = useState<UserTypes[]>([]);
  const [userStatuses, setUserStatuses] = useState<UserStatuses>({}); // Initialize as empty object
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7, // You can set the default page size
  });

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const data = await fetchPatients();
        setAllUsers(data);

        // Update user statuses after fetching the users
        const statuses: UserStatuses = data.reduce<UserStatuses>((acc, user) => {
          acc[user.id] = user.active === 1; // Convert initial status to boolean
          return acc;
        }, {});
        setUserStatuses(statuses); // Set user statuses after fetching
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, []);

  const handleToggle = (userId: number, checked: boolean) => {
    // Update the local state for the toggled user
    setUserStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: checked,
    }));

    // Log the result
    // console.log(`Toggling status for user ${userId}: ${checked}`);

    // Uncomment and adjust the fetch request to send the updated status to your API
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/status`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, active: checked ? 1 : 0 }), // Convert boolean to 1/0
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false, // Hide 'id' column
    firstname: false, // Hide 'firstname' column
    lastname: false, // Hide 'lastname' column
  });

  const table = useReactTable({
    data: allUsers,
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstname", header: "Firstname" },
      { accessorKey: "lastname", header: "Lastname" },
      {
        accessorKey: "fullname",
        header: "Full Name",
        cell: ({ row }) => `${row.original.firstname} ${row.original.lastname}`, // Combine firstname and lastname
      },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => {
          const userId = row.getValue<number>("id");
          const isActive = userStatuses[userId] || false; // Use || false to avoid undefined

          return (
            <Switch
              checked={isActive} // Reflect the toggle state from userStatuses
              onCheckedChange={(checked) => handleToggle(userId, checked)} // Handle state change
              className="mx-auto" // Center the toggle
            />
          );
        },
      },
    ],

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility,
      globalFilter: globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
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
            <BreadcrumbLink>Administration</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-semibold">User Administration</h1>
      <div className="flex gap-2">
        <Link href="/administration/add">
          <Button>Add User</Button>
        </Link>
        <Input
          placeholder="Filter patients…"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="bg-white rounded shadow-md shadow-slate-600 w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center bg-blue-500 text-white">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleFlatColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4 p-3">
          <Button
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.max(0, prev.pageIndex - 1) }))}
            disabled={pagination.pageIndex === 0}
            className={`bg-gray-800 text-white ${
              pagination.pageIndex === 0 ? "cursor-not-allowed" : "hover:bg-gray-700"
            } p-3`}
          >
            Previous
          </Button>
          {table.getPageCount() > 1 && (
            <span>
              Page {pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          )}
          <Button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.min(table.getPageCount() - 1, prev.pageIndex + 1),
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
            className={`bg-gray-800 text-white ${
              pagination.pageIndex >= table.getPageCount() - 1 ? "cursor-not-allowed" : "hover:bg-gray-700"
            } p-3`}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
