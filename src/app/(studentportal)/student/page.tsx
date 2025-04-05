"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { PatientAdmissionDetailsType } from "@/types/PatientAdmissionDetailsType";

type StudentPortal = {
  student_id: string;
};

export type DisplayDataType = Omit<PatientAdmissionDetailsType, "timestamp"> & {
  timestamp: string; // Overwritten to be specifically a string
};

const StudentPortalSchema = z.object({
  student_id: z.string(),
});
export default function Admissions() {
  const [studentHistory, setStudentHistory] = useState<DisplayDataType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<StudentPortal>({
    resolver: zodResolver(StudentPortalSchema),
    defaultValues: {
      student_id: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof StudentPortalSchema>) => {
    try {
      const { student_id } = formData;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student-record/${student_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        // Clear the error message and set student history
        setErrorMessage(null);
        setStudentHistory(result);
      } else {
        // Set the error message from the response
        setStudentHistory([]);
        setErrorMessage(result.message || "No records found");
      }
    } catch (error) {
      alert("Failed to connect to the server");
    }
  };

  const table = useReactTable({
    data: studentHistory,
    columns: [
      // { accessorKey: "id", header: "ID", hidden: true },
      // { accessorKey: "first_name", header: "First name" },
      // { accessorKey: "last_name", header: "Last name" },
      {
        accessorKey: "timestamp",
        header: "Date",
        cell: ({ cell }) => {
          const dateValue = cell.getValue();
          const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
          return date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString() : "Invalid date";
        },
      },
      {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({ cell }) => {
          const dateValue = cell.getValue();
          const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
          return date instanceof Date && !isNaN(date.getTime())
            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Invalid time";
        },
      },
      // {
      //   accessorKey: "common_reasons",
      //   header: "Reason",
      //   cell: ({ row }) => {
      //     const commonReasons = row.getValue("common_reasons");
      //     // Only display commonReasons if it exists; otherwise, return "N/A"
      //     return commonReasons ? commonReasons : "N/A";
      //   },
      // },
      {
        accessorKey: "services",
        header: "Service",
        cell: ({ row }) => {
          const service = row.getValue("services");
          // Only display commonReasons if it exists; otherwise, return "N/A"
          return service ? service : "N/A";
        },
      },
      // {
      //   accessorKey: "options",
      //   header: () => "Action",
      //   cell: ({ row }) => {
      //     const rowData = row.original as DisplayDataType; // Cast to DisplayDataType

      //     return (
      //       <Dialog>
      //         <DialogTrigger asChild>
      //           <div className="flex justify-center">
      //             <Button variant="default" className="flex gap-2 bg-gray-300 text-primary text-sm hover:bg-black/25">
      //               <Eye size="1rem" />
      //               View Details
      //             </Button>
      //           </div>
      //         </DialogTrigger>
      //         <DialogContent>
      //           <DialogHeader>
      //             <DialogTitle>Patient Details</DialogTitle>
      //           </DialogHeader>
      //           <div className="p-4">
      //             {/* Conditional rendering for common reasons */}
      //             <div className="mb-2">
      //               <strong>Chief Complaint:</strong>
      //               {rowData.common_reasons ? (
      //                 <span>{rowData.common_reasons.toString()}</span>
      //               ) : (
      //                 <span>{rowData.reasons?.toString() || "N/A"}</span>
      //               )}
      //             </div>

      //             {/* Show "cases" */}
      //             <div className="mb-2">
      //               <strong>Cases:</strong> <span>{rowData.cases?.toString() || "N/A"}</span>
      //             </div>

      //             {/* Show "prescription" */}
      //             <div className="mb-2">
      //               <strong>Prescription:</strong> <span>{rowData.prescription?.toString() || "N/A"}</span>
      //             </div>

      //             {/* Show "nurse_notes" */}
      //             <div className="mb-2">
      //               <strong>Nurse Notes:</strong> <span>{rowData.nurse_notes?.toString() || "N/A"}</span>
      //             </div>

      //             {/* Show "emas_on_duty" */}
      //             <div className="mb-2">
      //               <strong>EMAS on Duty:</strong> <span>{rowData.emas_on_duty?.toString() || "N/A"}</span>
      //             </div>

      //             {/* Show "timestamp" */}
      //             <div className="mb-2">
      //               <strong>Timestamp:</strong>
      //               <span>
      //                 {typeof rowData.timestamp === "string"
      //                   ? // Convert string to date
      //                     new Date(rowData.timestamp).toLocaleString()
      //                   : (rowData.timestamp as Date) instanceof Date
      //                   ? // Ensure it's a Date type
      //                     (rowData.timestamp as Date).toLocaleString()
      //                   : "Invalid date"}
      //               </span>
      //             </div>
      //           </div>
      //         </DialogContent>
      //       </Dialog>
      //     );
      //   },
      // },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <h1 className="text-4xl text-red-800 text-center font-bold">Student Portal</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <div className="flex gap-2 justify-center" style={{ marginTop: "50px" }}>
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="w-[250px]" placeholder="Student ID..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-auto">
              Search
            </Button>
          </div>
        </form>
      </Form>

      {errorMessage && (
        <div className="p-4 mb-4 border border-red-600 bg-red-200 rounded text-center">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="bg-white rounded shadow-md shadow-slate-600 w-full">
        {studentHistory.length > 0 && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-blue-500 text-white text-center">
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
                      <TableCell className="text-center" key={cell.id}>
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
        )}
      </div>
    </section>
  );
}
