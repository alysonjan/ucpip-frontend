"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctorFormSchema, DoctorFormSchema } from "@/types/DoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { z } from "zod";

const DocumentFormSchema = z.object({
  student_id: z.string().min(2).max(32),
  doctype: z.enum(["Physical Exam", "Medical Certificate", "Clinical Note", "Referral Form"]),
  doctor: z.string(),
});

const fetchDoctors = async (): Promise<DoctorFormSchema[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

const pdfTemplates: Record<string, string> = {
  "Physical Exam": "/new-template/physical-exam-template_page.jpg",
  "Medical Certificate": "/new-template/medical-certificate-template_page.jpg",
  "Clinical Note": "/new-template/clinic-note-template_page.jpg",
  "Referral Form": "/new-template/referral-form-template_page.jpg",
};

export default function Documents() {
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<DoctorFormSchema[]>([]);

  const [currentDoctor, setCurrentDoctor] = useState<{
    id?: number;
    fullname?: string;
    prc_license?: string;
  } | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [signature, setSignature] = useState<File | null>(null);

  const form = useForm<z.infer<typeof DocumentFormSchema>>({
    resolver: zodResolver(DocumentFormSchema),
    defaultValues: {
      student_id: "",
      doctor: "",
    },
  });

  const form2 = useForm<DoctorFormSchema>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: currentDoctor || {
      fullname: "",
      prc_license: "",
    },
  });

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctors();
  }, []);

  const handleAdd = () => {
    setCurrentDoctor(null); // Clear editing state
    setIsAddDialogOpen(true); // Open the modal
  };

  const handleSignatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSignature(file);
    }
  };

  const onSubmitAddDoctor = async (formData: z.infer<typeof doctorFormSchema>) => {
    const action = "add";

    if (signature) {
      const formData2 = new FormData();

      formData2.append("action", action);
      formData2.append("fullname", formData.fullname);
      formData2.append("prc_license", formData.prc_license);
      formData2.append("signature", signature); // The file object

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-doctor`, {
          method: "POST",
          credentials: "include",
          body: formData2,
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

  const onSubmit = async (formData: z.infer<typeof DocumentFormSchema>) => {
    if (formData.student_id === "") {
      alert("Student ID is required");
      return;
    }

    const payload = {
      student_id: formData.student_id,
      document_type: formData.doctype,
      doctor_id: formData.doctor,
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
    <>
      <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto ">
        <div className="p-4 bg-gray-200 rounded w-full mt-20">
          <h1 className="text-xl font-semibold">Document Generation</h1>
          <div className="grid grid-flow-col gap-4 columns-6">
            <Form {...form}>
              <form className="flex flex-col justify-center gap-4 col-span-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full" // Ensure the input is full width
                          placeholder="Student ID"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDocType(value);
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
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center mb-12 space-x-4">
                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Doctor</FormLabel>
                        <FormControl>
                          <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctors?.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor?.id?.toString() || ""}>
                                  {doctor.fullname}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div onClick={() => handleAdd()}>
                    <CirclePlus />
                  </div>
                </div>

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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Doctor</DialogTitle>
            <DialogDescription>Add new</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form2}>
              <form onSubmit={form2.handleSubmit(onSubmitAddDoctor)} className="space-y-4 flex flex-col w-full">
                <FormField
                  control={form2.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold text-gray-600">
                        Fullname <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Fullname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form2.control}
                  name="prc_license"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold text-gray-600">
                        PRC License # <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="PRC License #"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full">
                  <label className="font-bold text-gray-600">
                    Signature <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSignatureChange(e)}
                    className="w-full mt-2"
                  />
                </div>

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
