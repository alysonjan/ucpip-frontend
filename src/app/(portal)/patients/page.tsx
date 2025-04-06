"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PatientSchema } from "@/types/patient";
import { PaginationState } from "@tanstack/react-table";
import { differenceInCalendarYears } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Papa from "papaparse";
import PatientTable from "@/components/PatientPage/PatientTable";
import { CloudUpload, Download, Plus, PrinterIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PatientsTableRowModel = {
  age: number;
} & PatientSchema;

interface CsvData {
  [key: string]: string | number; // Allows for other flexible columns
}

const fetchPatients = async (): Promise<PatientSchema[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patients`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

export default function Patients() {
  const [patients, setPatients] = useState<PatientsTableRowModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [jsonData, setJsonData] = useState<CsvData[]>([]);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        const patientsWithAge = data.map((patient) => ({
          ...patient,
          age: differenceInCalendarYears(Date.now(), new Date(patient.date_of_birth)),
        }));
        setPatients(patientsWithAge);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  const getPatientsByCategory = (category: string) => {
    return patients.filter((patient) => patient.patient_category === category);
  };

  const normalPatients = getPatientsByCategory("Normal");
  const alertPatients = getPatientsByCategory("Alert");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "csv") {
        // Handle CSV file using PapaParse
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
            const data = results.data as CsvData[];
            setJsonData(data);

            const payload = {
              profile_photo: "default-profile.png",
              action: "add_bulk",
              data: data, // Include the CSV data in the payload
            };
            console.log("Parsed CSV Data:", payload);

            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Corrected the content type
                body: JSON.stringify(payload), // Send the payload to backend
              });

              const result = await response.json();

              if (response.ok) {
                // If the response is successful, show a success alert
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  timer: 5000,
                  text: result.message || "Patient data saved successfully!",
                });
                console.log("Server response:", result);
              } else {
                // If the response is not successful, show an error alert
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: result.message || "There was an error saving the patient data.",
                });
                console.error("Server error:", result);
              }
            } catch (error) {
              // Handle any other errors like network errors
              alert("Server Error");
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      } else if (fileExtension === "xlsx") {
        // Handle XLSX file using XLSX library
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target?.result as ArrayBuffer;
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          let json = XLSX.utils.sheet_to_json(sheet);

          setJsonData(json as CsvData[]);

          // Transform `date_of_birth` if it's in Excel serial number format
          json = json.map((item: any) => {
            const excelDate = item.date_of_birth;
            if (typeof excelDate === "number") {
              // Excel serial number to JavaScript date
              const parsedDate = new Date((excelDate - 25569) * 86400 * 1000); // Convert to milliseconds
              item.date_of_birth = format(parsedDate, "yyyy-MM-dd"); // Format as "YYYY-MM-DD"
            }
            return {
              ...item,
            };
          });

          const payload = {
            profile_photo: "default-profile.png",
            action: "add_bulk",
            data: json, // Include the Excel data in the payload
          };
          console.log("Parsed XLSX Data:", payload);

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/save`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", // Corrected the content type
              body: JSON.stringify(payload), // Send the payload to backend
            });

            const result = await response.json();

            if (response.ok) {
              // If the response is successful, show a success alert
              Swal.fire({
                icon: "success",
                title: "Success!",
                timer: 5000,
                text: result.message || "Patient data saved successfully!",
              });
              console.log("Server response:", result);
            } else {
              // If the response is not successful, show an error alert
              Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "There was an error saving the patient data.",
              });
              console.error("Server error:", result);
            }
          } catch (error) {
            // Handle any other errors like network errors
            alert("Server Error");
          }
        };
        reader.readAsArrayBuffer(file); // Use readAsArrayBuffer for binary files
      } else {
        console.error("Unsupported file type. Please upload a .csv or .xlsx file.");
      }
    }
  };

  const handleDelete = (student_id: string) => {
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
        onDelete(student_id);
      }
    });
  };

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

  const onDelete = async (student_id: string) => {
    setDeleteErrorMessage(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/delete/${student_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Patient deleted successfully!",
          timer: 1000,
          showConfirmButton: false,
          willClose: () => {
            window.location.reload();
          },
        });
      } else {
        const result = await response.json();
        setDeleteErrorMessage(result.message || "Delete failed");
      }
    } catch (error) {
      setDeleteErrorMessage("Failed to connect to the server");
    }
  };

  return (
    <>
      {deleteErrorMessage && <p className="text-red-500">{deleteErrorMessage}</p>}
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
              <BreadcrumbLink>Patients</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Patient Directory</h1>
          <p className="text-xl italic">
            ({patients.length} {patients.length === 1 ? "record" : "records"} found)
          </p>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Filter patients…"
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handlePrint} className="flex items-center gap-2">
              Print <PrinterIcon />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="text-green-500 font-bold text-lg">Normal: {normalPatients.length}</span>
              <span className="text-red-500 font-bold text-lg">Alert: {alertPatients.length}</span>
            </div>
            <Button
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/samplex.csv"; // Replace with the relative path to your XLSX file in the public folder
                link.download = "samplex.csv"; // Optional: Specify a download filename
                link.click();
              }}
            >
              <Download />
              Download Template
            </Button>
          </div>
        </div>

        <PatientTable
          print_id="printable-area"
          loading={loading}
          patients={patients}
          path={path}
          handleDelete={handleDelete}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pagination={pagination}
          setPagination={setPagination}
        />

        {/* Floating Button */}
        <div className="fixed bottom-6 right-6 space-y-4">
          {/* Upload Students Button */}
          <div className="relative group">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-[#800000] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 flex items-center justify-center"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CloudUpload />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>UPLOAD CSV</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Navigate to Admissions Menu Button */}
          <div className="relative group">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/patients/add"
                    className="bg-[#800000] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 flex items-center justify-center"
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
      </section>
    </>
  );
}
