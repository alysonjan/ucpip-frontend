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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientSchema } from "@/types/patient";
import { PatientAdmissionDetailsType } from "@/types/PatientAdmissionDetailsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectComponent, { SingleValue } from "react-select";
import Swal from "sweetalert2";

import { z } from "zod";

const DocumentFormSchema = z.object({
  student_id: z.string().min(2).max(32),
  doctype: z.enum(["Medical Certificate", "Clinical Note", "Referral Form"]),
});

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

const pdfTemplates: Record<string, string> = {
  "Medical Certificate": "/pdfs/medical-certificate.jpg",
  "Clinical Note": "/pdfs/clinic-note.jpg",
  "Referral Form": "/pdfs/physical-exam-report.jpg",
};

export default function Documents() {
  const [patients, setPatients] = useState<PatientAdmissionDetailsType[]>([]);
  const { control, setValue } = useForm();
  const [isMounted, setIsMounted] = useState(false);

  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

  const form = useForm<z.infer<typeof DocumentFormSchema>>({
    resolver: zodResolver(DocumentFormSchema),
    defaultValues: {
      student_id: "null",
    },
  });

  useEffect(() => {
    setIsMounted(true);

    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    getPatients();
  }, []);

  const uniqueRecords =
    patients && patients.length > 0
      ? Object.values(
          patients.reduce<{ [key: string]: PatientAdmissionDetailsType }>((acc, record) => {
            if (!acc[record.student_id]) {
              acc[record.student_id] = record; // Store the first occurrence
            }
            return acc;
          }, {})
        )
      : []; // Return an empty array if patients is null or empty

  const studentOptions = uniqueRecords?.map((student) => ({
    value: student.student_id,
    label: student.student_id,
    ...student,
  }));

  const handleStudentChange = (selectedOption: SingleValue<PatientAdmissionDetailsType>) => {
    // Existing student selected
    form.setValue("student_id", selectedOption?.student_id || "");
  };

  const onSubmit = async (formData: z.infer<typeof DocumentFormSchema>) => {
    if (formData.student_id === "null") {
      alert("Student ID is required");
      return;
    }

    const payload = {
      student_id: formData.student_id,
      document_type: formData.doctype,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/print-document`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const pdfFilename = `generated_${payload.student_id}.pdf`;

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", pdfFilename);
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "PDF downloaded successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        const errorText = await response.text();

        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: `Failed to generate the PDF: ${errorText}`,
        });
      }
    } catch (error) {
      console.error("Error details:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to connect to the server",
      });
    }
  };

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
            <BreadcrumbLink>Documents</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-4 bg-gray-200 rounded  w-full">
        <h1 className="text-xl font-semibold">Document Generation</h1>
        <div className="grid grid-flow-col gap-4 columns-6">
          <Form {...form}>
            <form className="flex flex-col justify-center gap-4 col-span-2" onSubmit={form.handleSubmit(onSubmit)}>
              {isMounted && (
                <FormField
                  control={control}
                  name="student_id"
                  render={({ field }) => (
                    <SelectComponent
                      {...field}
                      options={studentOptions}
                      placeholder="Select Student ID"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        handleStudentChange(selectedOption);
                      }}
                      isClearable
                    />
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <FormField
                control={form.control}
                name="doctype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document type</FormLabel>
                    {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedDocType(value); // Update the selected document type
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DocumentFormSchema.shape.doctype.options.map((option) => (
                          <SelectItem key={option.toLowerCase()} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the document type.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Print</Button>
            </form>
          </Form>

          <div className="flex justify-center items-center border border-primary rounded shadow gap-2 col-span-4 h-[512px]">
            {selectedDocType ? (
              <img
                src={pdfTemplates[selectedDocType]} // Load the corresponding JPG template
                alt={selectedDocType} // Alternative text for accessibility
                className="w-[350px] h-auto border rounded" // Adjust width and height as needed
              />
            ) : (
              <div className="text-center">
                <FileText size="1rem" /> Select a document type to preview the template
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
