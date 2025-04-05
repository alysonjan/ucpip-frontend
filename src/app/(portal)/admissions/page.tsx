"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Ellipsis, Eye, Pencil, PrinterIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { PatientAdmissionDetailsType } from "@/types/PatientAdmissionDetailsType";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Default theme CSS

const fetchPatients = async (): Promise<PatientAdmissionDetailsType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admissions`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

export default function Admissions() {
  const path = usePathname();

  const [patientAdmission, setPatientAdmission] = useState<PatientAdmissionDetailsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // You can set the default page size
  });
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: undefined, // No start date by default
    endDate: undefined, // No end date by default
    key: "selection",
  });

  const filteredData = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) {
      // If no date range is selected, display all data
      return patientAdmission;
    }

    const start = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
    const end = new Date(dateRange.endDate).setHours(23, 59, 59, 999);

    // Filter data based on the selected date range
    return patientAdmission.filter((admission) => {
      const admissionDate = new Date(admission.timestamp).getTime();
      return admissionDate >= start && admissionDate <= end;
    });
  }, [patientAdmission, dateRange]);

  const [fullname, setFullname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname");
    const storedRole = localStorage.getItem("role");
    if (storedFullname) {
      setFullname(storedFullname);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // const handlePrint = () => {
  //   const printContent = document.getElementById("printable-area");
  //   const windowPrint = window.open("", "_blank");

  //   if (windowPrint && printContent) {
  //     windowPrint.document.write(`
  //       <html>
  //         <head>
  //           <title>Southwestern University-PHINMA</title>
  //           <style>
  //             body {
  //               font-family: Arial, sans-serif;
  //               margin: 20px;
  //             }
  //             .print-container {
  //               border: 1px solid black;
  //               padding: 20px;
  //               border-radius: 8px;
  //             }
  //             .print-title {
  //               text-align: center;
  //               font-size: 1.5rem;
  //               font-weight: bold;
  //               margin-bottom: 20px;
  //               text-transform: uppercase; /* Make the title uppercase */
  //             }
  //             table {
  //               width: 100%;
  //               border-collapse: collapse;
  //               text-transform: uppercase; /* Make all table content uppercase */
  //             }
  //             th, td {
  //               border: 1px solid black;
  //               padding: 8px;
  //               text-align: left;
  //             }
  //             th {
  //               background-color: #f4f4f4;
  //               font-weight: bold;
  //             }
  //             .footer {
  //               margin-top: 20px;
  //               font-size: 1rem;
  //               font-style: italic;
  //               text-align: right;
  //             }
  //             .action-buttons, .pagination-controls {
  //               display: none !important;
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="print-container">
  //             <div class="print-title">SWU Clinic Report</div>
  //             ${printContent.innerHTML}
  //           </div>
  //           <div class="footer">
  //             Made by: ${fullname || "N/A"} (${role})
  //           </div>
  //         </body>
  //       </html>
  //     `);
  //     windowPrint.document.close();
  //     windowPrint.focus();
  //     windowPrint.print();
  //     windowPrint.close();
  //   }
  // };

  const handlePrint = () => {
    const printContent = document.getElementById("printable-area");
    const windowPrint = window.open("", "_blank");

    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>.</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                position: relative;
                padding-bottom: 30px; /* Ensure space for footer at the bottom */
              }
              .print-title-section {
                margin-bottom: 20px; /* Space between the header and the container */
                text-align: center;
              }
              .print-title {
                font-size: 34px;
                font-weight: bold;
                color: maroon; /* Maroon color for the title */
                text-transform: uppercase;
                border-bottom: 2px solid black; /* Black line below the title */
                padding-bottom: 10px;
              }
              .print-subtitle {
                font-size: 20px;
                font-weight: normal;
                color: black; /* Black color for 'PHINMA' */
                margin-top: 5px;
              }
              .print-container {
                border: 1px solid black;
                padding: 20px;
                border-radius: 8px;
              }
              .print-title-in-table {
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 20px;
                text-transform: uppercase;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                text-transform: uppercase;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f4f4f4;
                font-weight: bold;
              }
              .footer {
                position: absolute;
                bottom: 20px; /* Fix it at the bottom */
                left: 20px; /* Align it to the left */
                font-size: 1rem;
                font-style: italic;
              }
              .action-buttons, .pagination-controls {
                display: none !important;
              }
            </style>
          </head>
          <body>
            <div class="print-title-section">
              <div class="print-title">Southwestern University</div>
              <div class="print-subtitle">PHINMA</div>
            </div>
            <div class="print-container">
              <div class="print-title-in-table">SWU Clinic Report</div>
              ${printContent.innerHTML}
            </div>
            <div class="footer">
                Made by: ${fullname || "N/A"} (${role})
            </div>
          </body>
        </html>
      `);
      windowPrint.document.close();
      windowPrint.focus();
      windowPrint.print();
      windowPrint.close();
    }
  };

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatientAdmission(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this patient?",
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Patient Admission deleted successfully!",
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

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false, // Hide 'id' column
  });

  const table = useReactTable({
    // data: patientAdmission,
    data: filteredData,
    columns: [
      { accessorKey: "id", header: "Admission ID" },
      {
        accessorKey: "student_id",
        header: "Student ID",
        cell: (info) => {
          const value = info.getValue() as string;
          const formattedValue = value.replace(/(\w{2})(\w{4})(\w+)/, "$1-$2-$3");
          return formattedValue;
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "full_name",
        header: "Full Name",
        cell: (info) => {
          const firstName = info.row.original.first_name || "";
          const lastName = info.row.original.last_name || "";
          return `${lastName}, ${firstName}`.trim();
        },
        filterFn: "includesString",
      },
      {
        accessorKey: "services",
        header: "Service",
        cell: ({ getValue }) => getValue()?.toUpperCase(),
      },
      {
        accessorKey: "timestamp",
        header: "Date",
        cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          return format(date, "MMM-dd-yyyy h:mm a"); // Format the date
        },
      },
      {
        accessorKey: "options",
        header: () => <div className="action-buttons">Action</div>,
        cell: ({ row, cell }) => {
          return (
            <div className="action-buttons">
              <Popover>
                <PopoverTrigger>
                  <Ellipsis />
                </PopoverTrigger>
                <PopoverContent className="w-fit p-1">
                  <ul className="list-none">
                    <li>
                      <Link
                        href={`${path}/${row.getValue("id")}`}
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "flex gap-2 bg-transparent w-full text-primary justify-start text-sm hover:bg-black/25"
                        )}
                      >
                        <Eye size="1rem" />
                        View
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${path}/edit/${row.getValue("id")}`}
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "flex gap-2 bg-transparent w-full text-primary justify-start text-sm hover:bg-black/25"
                        )}
                      >
                        <Pencil size="1rem" />
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Button
                        onClick={() => handleDelete(row.getValue("id"))}
                        className="flex gap-2 bg-transparent w-full text-primary justify-start text-sm hover:bg-black/25"
                      >
                        <Trash2 size="1rem" />
                        Delete
                      </Button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
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
    <>
      {loading ? (
        <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">Loading patients...</h1>
        </section>
      ) : (
        <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
          <h1 className="text-xl font-semibold">Consultation Directory</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Filter patients…"
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center space-x-2">
              {/* <p className="font-medium">Date Created:</p> */}
              <div className="flex flex-col space-y-2">
                {/* <label className="font-medium text-gray-700">Date-Created :</label> */}
                <Popover>
                  <PopoverTrigger asChild>
                    {/* <Button className="w-full text-left">
                      {dateRange.startDate?.toLocaleDateString()} - {dateRange.endDate?.toLocaleDateString()}
                    </Button> */}
                    <Button className="w-full text-left">
                      {dateRange.startDate && dateRange.endDate
                        ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
                        : "Filter Dates"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <DateRange
                      ranges={[dateRange]}
                      onChange={(range) => setDateRange(range.selection)}
                      rangeColors={["#4f46e5"]}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              Print <PrinterIcon />
            </Button>
          </div>

          <div id="printable-area" className="bg-white rounded shadow-md shadow-slate-600 w-full">
            <Table className="w-full border-collapse border border-gray-300">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border border-gray-300">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="bg-blue-500 text-white border border-gray-300">
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
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border border-gray-300"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="border border-gray-300">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border border-gray-300">
                    <TableCell
                      colSpan={table.getVisibleFlatColumns().length}
                      className="h-24 text-center border border-gray-300"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="pagination-controls flex items-center justify-between mt-4 p-3">
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
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 space-y-4">
              <div className="relative group">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admissions/menu"
                        className="fixed bottom-6 right-6 bg-[#800000] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 flex items-center justify-center"
                      >
                        <Plus />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ADD</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
