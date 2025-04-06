import { Dispatch, FC, SetStateAction } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { PatientSchema } from "@/types/patient";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePatientContext } from "@/context/PatientProvider";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type PatientsTableRowModel = {
  age: number;
} & PatientSchema;

interface PatientTableProps {
  print_id: string;
  loading: boolean;
  patients: PatientsTableRowModel[];
  path: string;
  handleDelete: (student_id: string) => void;
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  pagination: PaginationState; // Use PaginationState here
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

const PatientTable: FC<PatientTableProps> = ({
  print_id,
  loading,
  patients,
  path,
  handleDelete,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
}) => {
  const router = useRouter();
  const { setSelectedPatient } = usePatientContext();

  const redirectToEditPatientPage = (patient: PatientSchema) => {
    setSelectedPatient(patient);
    router.push(`/patients/edit/${patient?.student_id}`);
  };

  const table = useReactTable({
    data: patients,
    columns: [
      {
        accessorKey: "student_id",
        header: "Student ID",
        cell: (info) => {
          const value = info.getValue() as string;
          // Add dash to the student ID (e.g., S123456099 -> S123-456-099)
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
      { accessorKey: "department_name", header: "Department" },
      {
        accessorKey: "options",
        header: () => <div className="action-buttons">Action</div>,
        cell: ({ row }) => {
          const patientData = row.original;
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
                        href={`${path}/${row.getValue("student_id")}`}
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
                      <Button
                        onClick={() => redirectToEditPatientPage(patientData)}
                        className="flex gap-2 bg-transparent w-full text-primary justify-start text-sm hover:bg-black/25"
                      >
                        <Pencil size="1rem" />
                        Edit
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() => handleDelete(row.getValue("student_id"))}
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
      globalFilter: globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  return (
    <>
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div id={print_id} className="bg-white rounded shadow-md shadow-slate-600 w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="bg-blue-500 text-white">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const patientCategory = row.original.patient_category || ""; // Ensure it's a string

                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "group", // Add group class for hover effects
                        patientCategory === "Alert"
                          ? "bg-red-200 hover:bg-red-300" // Red background with darker red on hover
                          : "hover:bg-gray-100" // Default hover effect for non-alert rows
                      )}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getVisibleFlatColumns().length} className="h-24 text-center">
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
        </div>
      )}
    </>
  );
};
export default PatientTable;
