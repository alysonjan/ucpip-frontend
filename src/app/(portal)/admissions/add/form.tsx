"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { patientAdmissionSchema } from "@/types/patientAdmission";
import type { PatientAdmissionSchema } from "@/types/patientAdmission";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarYears, format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { PatientSchema } from "@/types/patient";
import SelectComponent, { SingleValue } from "react-select";
import Swal from "sweetalert2";

type PatientsTableRowModel = {
  age: number;
} & PatientSchema;

interface Student {
  student_id: string;
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

export default function NewAdmissionForm() {
  const [patients, setPatients] = useState<PatientsTableRowModel[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [fullname, setFullname] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { control, setValue } = useForm();
  const [isMounted, setIsMounted] = useState(false);

  const [isNewStudent, setIsNewStudent] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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
      }
    };

    getPatients();
  }, []);

  const studentOptions = patients?.map((student) => ({
    value: student.student_id,
    label: student.student_id,
    ...student, // Attach student data for easy access
  }));

  const now = new Date();
  // const formattedDate = format(now, "yyyy-MM-dd");
  const formattedDate = format(now, "MMM-dd-yyyy h:mm a");

  const form = useForm<PatientAdmissionSchema>({
    resolver: zodResolver(patientAdmissionSchema),
    defaultValues: {
      student_id: "",
      first_name: "",
      last_name: "",
      sex: "male",
      contact: "",
      email: "",
      address: "",
      date_of_birth: "",
      department: "",
    },
  });

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
      }
    };

    fetchDepartments();

    const storedFullname = localStorage.getItem("fullname");
    if (storedFullname) {
      setFullname(storedFullname);
    }
  }, []);

  const handleStudentChange = (selectedOption: SingleValue<PatientSchema>) => {
    if (selectedOption && selectedOption.value !== "insert_new") {
      // Existing student selected
      form.setValue("student_id", selectedOption.student_id || "");
      form.setValue("first_name", selectedOption.first_name);
      form.setValue("last_name", selectedOption.last_name);
      form.setValue("email", selectedOption.email);
      form.setValue("sex", selectedOption.sex);
      form.setValue("address", selectedOption.address);
      form.setValue("date_of_birth", selectedOption.date_of_birth);
      form.setValue("contact", selectedOption.contact);
      form.setValue("department", selectedOption.department);
      setIsNewStudent(false); // Reset to false if an existing student is selected
    } else {
      // New student option selected
      setIsNewStudent(true); // Set flag to show input field
      // Clear existing values if needed
      form.reset({
        student_id: "",
        first_name: "",
        last_name: "",
        email: "",
        sex: "male" as "male" | "female", // Set default or keep as it is
        address: "",
        date_of_birth: "",
        contact: "",
        department: "",
      });
    }
  };

  // const { formState: { errors } } = form;
  // console.log("Validation Errors:", errors);

  const onSubmit = async (formData: z.infer<typeof patientAdmissionSchema>) => {
    const payload = {
      profile_photo: "default-profile.png",
      emasOnDuty: fullname ?? "",
      timestamp: format(now, "yyyy-MM-dd HH:mm:ss") ?? "",
      ...formData,
    };
    // console.log(payload)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Patient data has been added successfully.",
          confirmButtonText: "OK",
        });
        window.location.reload();
      } else {
        console.error(result.message || "Insert failed");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Insert failed",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      alert("Failed to connect to the server");
    }
  };

  const commonIllnesses = [
    "Headache",
    "Diarrhea",
    "Muscle Pain",
    "Fever",
    "Nausea",
    "Cough",
    "Cold",
    "Allergy",
    "Stomach Pain",
    "Sore Throat",
    "Fatigue",
    "Vomiting",
    "Back Pain",
    "Chest Pain",
    "Rash",
    "Dizziness",
    "Shortness of Breath",
    "Skin Irritation",
    "Joint Pain",
    "Injury",
    "Other",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
        {isMounted && (
          <>
            {isNewStudent ? (
              <input
                type="text"
                placeholder="Enter new student ID"
                onChange={(e) => form.setValue("student_id", e.target.value)} // Update form value on change
                className="mt-2 w-full border rounded p-2"
              />
            ) : (
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
                    // noOptionsMessage={() => (
                    //   <div
                    //     onClick={() => {
                    //       const newOption = {
                    //         value: "insert_new",
                    //         label: "Insert new student?",
                    //         student_id: "",
                    //         first_name: "",
                    //         last_name: "",
                    //         email: "",
                    //         sex: "male" as "male" | "female",
                    //         address: "",
                    //         date_of_birth: "",
                    //         contact: "",
                    //         department: "",
                    //         smoking: "No" as "No" | "Yes",
                    //         drinking: "No" as "No" | "Yes",
                    //         blood_type: "N/A" as "N/A" | "A+",
                    //         patient_category: "Normal" as "Normal" | "Alert", // Add a default value for patient_category
                    //       };
                    //       field.onChange(newOption);
                    //       handleStudentChange(newOption); // Clear existing fields
                    //     }}
                    //     style={{ cursor: "pointer", color: "blue" }}
                    //   >
                    //     Insert new student?
                    //   </div>
                    // )}
                  />
                )}
              />
            )}
          </>
        )}

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Firstname" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Lastname" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                    <SelectContent>
                      {patientAdmissionSchema.shape.sex.options.map((option) => (
                        <SelectItem key={option.toLowerCase()} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
                <FormItem>
                <Popover modal={true}>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal flex", !field.value && "text-muted-foreground")}
                        >
                        {field.value ? format(parse(field.value, "yyyy-MM-dd", new Date()), "P") : <span>Birthdate</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value ? parse(field.value, "yyyy-MM-dd", new Date()) : undefined}
                        onSelect={(date) => {
                        if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"));
                        }
                        }}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            /> */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="w-[150px]">
                <label htmlFor={field.name} className="mb-1 block text-xs font-medium text-gray-700">
                  Birthdate
                </label>
                <FormControl>
                  <input
                    type="date"
                    {...field}
                    id={field.name} // Link the label to the input
                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    onChange={(e) => {
                      field.onChange(e.target.value); // Update the value with the date string
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Home Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Contact Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id.toString()}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="cases"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Cases" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vitalSigns"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Vital Signs" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prescription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Prescription" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nurseNotes"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Nurse notes" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="actions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Actions" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="common_reasons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonIllnesses.map((illness, index) => (
                        <SelectItem key={index} value={illness}>
                          {illness}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reasons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Other Reasons (Optional)" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h3>Created by: {fullname ?? ""}</h3>
        <h3>Current Date: {formattedDate} </h3>

        <div className="flex justify-center">
          <Button type="submit" className="w-full max-w-[200px]">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
