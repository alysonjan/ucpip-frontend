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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { chiefComplaintFormSchema, ChiefComplaintFormSchema } from "@/types/ChiefComplaintFormSchema";

export default function Others() {
  const [chiefComplaint, setChiefComplaint] = useState<ChiefComplaintFormSchema[]>([]);

  const [currentChiefComplaint, setCurrentChiefComplaint] = useState<{
    id?: number;
    name?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [signature, setSignature] = useState<File | null>(null);

  const form = useForm<ChiefComplaintFormSchema>({
    resolver: zodResolver(chiefComplaintFormSchema),
    defaultValues: currentChiefComplaint || {
      name: "",
    },
  });

  useEffect(() => {
    const fetchChiefComplaints = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chief-complaints`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setChiefComplaint(data);
      } catch (error) {
        console.error("Failed to fetch Chief Complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChiefComplaints();

    form.reset(currentChiefComplaint || { name: "" });
  }, [currentChiefComplaint, form]);

  const handleEdit = (row: any) => {
    setCurrentChiefComplaint({
      id: row.original.id, // Ensure you pass the ID of the doctor
      name: row.original.name,
    });
    setIsDialogOpen(true); // Open the dialog
  };

  const handleAdd = () => {
    setCurrentChiefComplaint(null); // Clear editing state
    setIsAddDialogOpen(true); // Open the modal
  };

  const onSubmit = async (formData: z.infer<typeof chiefComplaintFormSchema>) => {
    const action = currentChiefComplaint ? "edit" : "add";

    if (action === "edit") {
      const payload = {
        action,
        id: currentChiefComplaint?.id,
        ...formData,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-chief-complaints`, {
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
            title: "Updated",
            text: result.message,
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
              window.location.reload(); // Reload the page
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: result.message || "Operation failed",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error(`Error during ${action}:`, error);
        alert("Failed to connect to the server");
      }
    } else {
      const formData2 = {
        action: action,
        name: formData.name,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-chief-complaints`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this line
          },
          credentials: "include",
          body: JSON.stringify(formData2),
        });

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Created",
            text: result.message,
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
              window.location.reload(); // Reload the page
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: result.message || "Operation failed",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error(`Error during ${action}:`, error);
        alert("Failed to connect to the server");
      }
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Illness?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  const onDelete = async (id: number) => {
    setDeleteErrorMessage(null);
    try {
      const payload = {
        id,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-chief-complaints`, {
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
          text: "Illness deleted successfully!",
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
    data: chiefComplaint,
    columns: [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Chief Complaint</div>, // Center header text
        cell: ({ getValue }) => (
          <div className="text-center">{getValue()}</div> // Center cell content
        ),
      },
      {
        accessorKey: "edit",
        header: () => <div className="text-center">Edit</div>, // Center header text
        cell: ({ row }) => (
          <div className="flex justify-center">
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
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-white bg-red-800 hover:bg-red-700"
              onClick={() => handleDelete(row.original.id || 0)}
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
          <h1 className="text-xl font-semibold">Loading chief complaints...</h1>
        </section>
      ) : (
        <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">Chief Complaint Table</h1>
          <div className="flex gap-2">
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

      {chiefComplaint && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Illness</DialogTitle>
              <DialogDescription>-</DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-bold text-gray-600">
                          Illness <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Illness"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="mt-4" type="submit">
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Illness</DialogTitle>
            <DialogDescription>Add new</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold text-gray-600">
                        Illness <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Illness"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mt-4" type="submit">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
