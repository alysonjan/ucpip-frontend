"use client";

import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import VaccinationForm from "./VaccinationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TraumaForm from "./TraumaForm";
import MedicalForm from "./MedicalForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PatientSchema } from "@/types/patient";
import { differenceInCalendarYears, format } from "date-fns";
import { patientAdmissionSchema, PatientAdmissionSchema } from "@/types/patientAdmission";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectComponent, { SingleValue } from "react-select";
import MedcertForm from "./MedcertForm";
import PhysicalExamForm from "./PhysicalExamForm";
import Link from "next/link";

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

export default function AdmissionsMenu() {
  const [patients, setPatients] = useState<PatientsTableRowModel[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [fullname, setFullname] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { control, setValue } = useForm();
  const [isMounted, setIsMounted] = useState(false);

  const [isNewStudent, setIsNewStudent] = useState(false);

  const [activeTab, setActiveTab] = useState("patient_info_form");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [payload, setPayload] = useState<PatientAdmissionSchema | null>(null); // Correctly typed

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

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
      temperature: "",
      pulse_rate: "",
      respiratory_rate: "",
      blood_pressure: "",
      oxygen_saturation: "",
      pain_scale: "",
      services: [],
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
  // const predefinedOrder = ["medical", "trauma", "vaccination"];
  const predefinedOrder = ["health_concern", "physical_exam", "med_certificate", "vaccination"];

  const onSubmit = async (formData: z.infer<typeof patientAdmissionSchema>) => {
    const newPayload = {
      profile_photo: "default-profile.png",
      emasOnDuty: fullname ?? "",
      timestamp: format(now, "yyyy-MM-dd HH:mm:ss") ?? "",
      ...formData,
    };

    // console.log(newPayload.services);

    // Check services and navigate to the appropriate tab
    setPayload(newPayload);

    setSelectedServices(newPayload.services);
    const selectedServices = newPayload.services;

    // Sort the selectedServices array
    const sortedServices = selectedServices.sort((a, b) => predefinedOrder.indexOf(a) - predefinedOrder.indexOf(b));

    // Set the active tab based on the sorted services
    if (sortedServices.includes("health_concern")) {
      setActiveTab("health_concern_form");
    } else if (sortedServices.includes("physical_exam")) {
      setActiveTab("physical_exam_form");
    } else if (sortedServices.includes("med_certificate")) {
      setActiveTab("med_certificate_form");
    } else if (sortedServices.includes("vaccination")) {
      setActiveTab("vaccination_form");
    } else {
      console.log("No valid service selected");
    }
  };

  const services = [
    { label: "Health Concern", value: "health_concern" },
    { label: "Physical Exam", value: "physical_exam" },
    { label: "Medical Certificate", value: "med_certificate" },
    { label: "Vaccination", value: "vaccination" },
  ];

  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto ">
      <div className="flex gap-2">
        <h1 className="text-xl font-semibold mb-8">NEW CONSULTATION</h1>{" "}
      </div>

      <div className="bg-gray-200 rounded shadow-md shadow-slate-600 w-full p-4 space-y-4">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-end w-full">
            {/* Patient Form Tab Trigger - Positioned on the left */}
            {/* <div className="flex">
              <TabsTrigger value="patient_info_form" className="ml-0">
                PATIENT INFO
              </TabsTrigger>
            </div> */}

            {/* Other Tab Triggers - Positioned on the right */}
            <div className="flex space-x-2">
              <TabsTrigger value="patient_info_form" className="ml-0">
                PATIENT INFO
              </TabsTrigger>
              <TabsTrigger value="health_concern_form" disabled={!selectedServices.includes("medical")}>
                HEALTH CONCERN
              </TabsTrigger>
              {/* <TabsTrigger value="trauma_form" disabled={!selectedServices.includes("trauma")}>
                Trauma
              </TabsTrigger> */}
              <TabsTrigger value="physical_exam_form" disabled={!selectedServices.includes("physical_exam")}>
                PHYSICAL EXAM
              </TabsTrigger>
              <TabsTrigger value="med_certificate_form" disabled={!selectedServices.includes("med_certificate")}>
                MED CERTIFICATE
              </TabsTrigger>
              <TabsTrigger value="vaccination_form" disabled={!selectedServices.includes("vaccination")}>
                VACCINATION
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="health_concern_form">
            <MedicalForm data={payload} onContinue={handleTabChange} setActiveTab={setActiveTab} />
          </TabsContent>
          {/* <TabsContent value="trauma_form">
            <TraumaForm data={payload} onContinue={handleTabChange} />
          </TabsContent> */}
          <TabsContent value="physical_exam_form">
            <PhysicalExamForm data={payload} onContinue={handleTabChange} setActiveTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="med_certificate_form">
            <MedcertForm data={payload} onContinue={handleTabChange} setActiveTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="vaccination_form">
            <VaccinationForm data={payload} onContinue={handleTabChange} setActiveTab={setActiveTab} />
          </TabsContent>

          {/* // ################################################### NEW CONSULTATION FORM ##################################################3 */}
          <TabsContent value="patient_info_form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
                          <>
                            <SelectComponent
                              {...field}
                              options={studentOptions}
                              placeholder="Select Student ID"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                handleStudentChange(selectedOption);
                              }}
                              isClearable
                              noOptionsMessage={() => (
                                <div
                                  onClick={() => {
                                    const newOption = {
                                      value: "insert_new",
                                      label: "Insert new student?",
                                      student_id: "",
                                      first_name: "",
                                      last_name: "",
                                      email: "",
                                      sex: "male" as "male" | "female",
                                      address: "",
                                      date_of_birth: "",
                                      contact: "",
                                      department: "",
                                      smoking: "No" as "No" | "Yes",
                                      drinking: "No" as "No" | "Yes",
                                      blood_type: "N/A" as "N/A" | "A+",
                                    };
                                    field.onChange(newOption);
                                    handleStudentChange(newOption); // Clear existing fields
                                  }}
                                  style={{ cursor: "pointer", color: "blue" }}
                                >
                                  Insert new student?
                                </div>
                              )}
                            />
                          </>
                        )}
                      />
                    )}
                  </>
                )}

                <div className="grid grid-cols-3 gap-6">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <legend className="text-lg font-bold text-left">Information</legend>

                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Firstname</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Firstname" />
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
                          <FormLabel className="ml-2">Lastname</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Lastname" />
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
                          <FormLabel className="ml-2">Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Email" />
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
                          <FormLabel className="ml-2">Sex</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="date_of_birth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Birthdate</FormLabel>
                          <FormControl>
                            <input type="date" {...field} id={field.name} className="w-full border rounded p-2" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Home Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Home Address" />
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
                          <FormLabel className="ml-2">Contact Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Contact Number" />
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
                          <FormLabel className="ml-2">Department</FormLabel>
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

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <legend className="text-lg font-bold text-left">Vital Signs</legend>
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Temperature</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Temperature" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pulse_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Pulse Rate</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Pulse Rate" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="respiratory_rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Respiratory Rate</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Respiratory Rate" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="blood_pressure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Blood Pressure</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Blood Pressure" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="oxygen_saturation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Oxygen Saturation</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Oxygen Saturation" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pain_scale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="ml-2">Pain Scale</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Pain Scale" />
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
                          <FormLabel className="ml-2">Nurse notes</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Nurse notes" rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-6 p-4   ">
                    <FormField
                      control={form.control}
                      name="services"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-xl font-bold text-gray-800">Services</FormLabel>
                          <FormControl>
                            <div className="flex flex-col space-y-4">
                              {services.map((service) => (
                                <label key={service.value} className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    value={service.value}
                                    checked={field.value.includes(service.value)}
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      const newValue = e.target.checked
                                        ? [...field.value, value]
                                        : field.value.filter((item) => item !== value);
                                      field.onChange(newValue);
                                    }}
                                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-gray-700 text-sm font-medium">{service.label}</span>
                                </label>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <h3>Created by: {fullname ?? ""}</h3>
                <h3>Current Date: {formattedDate} </h3>

                <div className="flex justify-center">
                  <Link href="/admissions">
                    <Button className="w-[200px] m-5">Back</Button>
                  </Link>
                  <Button type="submit" className="w-full max-w-[200px] m-5">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
