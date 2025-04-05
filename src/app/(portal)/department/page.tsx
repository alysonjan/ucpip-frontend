"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PaginationControls from "@/components/PaginationControls";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Departments() {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7, // You can set the default page size
  });
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // State to control dialog visibility

  const [selectedDepartment, setSelectedDepartment] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [name, setName] = useState(""); // Local state for name input field
  const [newDepartmentName, setNewDepartmentName] = useState(""); // Local state for name input field

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/departments`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleEdit = (row: any) => {
    const department = row.original;
    setSelectedDepartment(department);
    setName(department.name); // Pre-fill with department name
    setIsDialogOpen(true); // Open the modal
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true); // Open the modal
  };

  // Function to handle form submission for updating the department
  const handleSubmit = async () => {
    if (selectedDepartment) {
      try {
        const payload = {
          id: selectedDepartment.id,
          name,
          action: "edit",
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-department`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        console.log("Department updated:", { id: selectedDepartment.id, name });
        setSelectedDepartment(null); // Close the modal
        const result = await response.json();
        if (response.ok) {
          // Show success alert
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: result.message,
            confirmButtonText: "OK",
          });
          window.location.reload();
        } else {
          console.error(result.message || "Update failed");
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: result.message || "Update failed",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Failed to update department:", error);
      }
    }
  };

  // Function to handle form submission for updating the department
  const handleAddSubmit = async () => {
    try {
      if (newDepartmentName === "") {
        return;
      }
      const payload = {
        name: newDepartmentName,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-department`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      setSelectedDepartment(null); // Close the modal
      const result = await response.json();
      if (response.ok) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message,
          confirmButtonText: "OK",
        });
        window.location.reload();
      } else {
        console.error(result.message || "Create failed");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Create failed",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to add department:", error);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id); // Call the onDelete function if confirmed
      }
    });
  };

  const onDelete = async (id: string) => {
    setDeleteErrorMessage(null);
    try {
      const payload = {
        id,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-department`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Department deleted successfully!",
          timer: 1000,
          showConfirmButton: false,
          willClose: () => {
            window.location.reload();
          },
        });
      } else {
        setDeleteErrorMessage(result.message || "Delete failed");
      }
    } catch (error) {
      setDeleteErrorMessage("Failed to connect to the server");
    }
  };

  const table = useReactTable({
    data: departments,
    columns: [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Department Name</div>, // Center header text
        cell: ({ getValue }) => (
          <div className="text-center">{getValue()}</div> // Center cell content
        ),
      },
      {
        accessorKey: "edit",
        header: () => <div className="text-center">Edit</div>, // Center header text
        cell: ({ row }) => (
          <div className="text-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-white bg-green-800 hover:bg-green-700"
              onClick={() => handleEdit(row)}
            >
              <Pencil size="1rem" />
              EDIT
            </Button>
          </div>
        ),
      },
      {
        accessorKey: "delete",
        header: () => <div className="text-center">Delete</div>, // Center header text
        cell: ({ row }) => (
          <div className="text-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-white bg-red-800 hover:bg-red-700"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 size="1rem" />
              DELETE
            </Button>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  return (
    <>
      {loading ? (
        <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">Loading departments...</h1>
        </section>
      ) : (
        <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">Departments</h1>
          <div className="flex gap-2">
            {/* <Button onClick={handleAdd}>Add Department</Button> */}

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
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="bg-blue-500 text-white">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
            {/* Pagination controls */}

            {/* <PaginationControls table={table} /> */}

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

          {/* Floating Button */}
          <div className="fixed bottom-6 right-6 space-y-4">
            <div className="relative group">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-[#800000] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 flex items-center justify-center"
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                      onClick={() => handleAdd()}
                    >
                      <Plus />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ADD</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </section>
      )}

      {departments && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
              <DialogDescription>Department Name</DialogDescription>
            </DialogHeader>
            <div>
              <input
                id="departmentName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Handle input change
                className="w-full p-2 border border-gray-300 rounded"
              />
              <Button
                className="mt-4"
                onClick={handleSubmit} // Handle save/update here
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Department</DialogTitle>
            <DialogDescription>Department Name</DialogDescription>
          </DialogHeader>
          <div>
            <input
              id="departmentName"
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)} // Handle input change
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button
              className="mt-4"
              onClick={handleAddSubmit} // Handle save/update here
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
