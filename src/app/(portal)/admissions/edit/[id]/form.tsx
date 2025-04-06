"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { patientAdmissionSchema } from "@/types/patientAdmission";
import type { PatientAdmissionSchema } from "@/types/patientAdmission";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

type ModifiedPatientAdmission = Omit<PatientAdmissionSchema, "nurseNotes"> & {
  nurse_notes: PatientAdmissionSchema["nurseNotes"];
};

const ModifiedPatientAdmissionSchema = patientAdmissionSchema
  .extend({
    nurse_notes: patientAdmissionSchema.shape.nurseNotes,
  })
  .omit({
    nurseNotes: true,
  });

const fetchPatientAdmissionData = async (id: string): Promise<ModifiedPatientAdmission> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching patient data: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: ModifiedPatientAdmission[] = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No patient admission data found for the given ID");
    }

    return data[0];
  } catch (error) {
    console.error(`Failed to fetch patient admission data for ID: ${id}`, error);
    throw error;
  }
};

export default function EditAdmissionForm() {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [fullname, setFullname] = useState<string | null>(null);

  const { id } = useParams();
  const [patient, setPatient] = useState<ModifiedPatientAdmission | null>(null);
  const patientId = Array.isArray(id) ? id[0] : id;

  // const commonIllnesses = [
  //   "Headache",
  //   "Diarrhea",
  //   "Muscle Pain",
  //   "Fever",
  //   "Nausea",
  //   "Cough",
  //   "Cold",
  //   "Allergy",
  //   "Stomach Pain",
  //   "Sore Throat",
  //   "Fatigue",
  //   "Vomiting",
  //   "Back Pain",
  //   "Chest Pain",
  //   "Rash",
  //   "Dizziness",
  //   "Shortness of Breath",
  //   "Skin Irritation",
  //   "Joint Pain",
  //   "Injury",
  //   "Other",
  // ];

  const form = useForm<ModifiedPatientAdmission>({
    // resolver: zodResolver(ModifiedPatientAdmissionSchema),
    defaultValues: patient || {
      student_id: "",
      first_name: "",
      last_name: "",
      email: "",
      sex: "male",
      date_of_birth: "",
      address: "",
      contact: "",
      department: "",
      // cases: "",
      // vital_signs: "",
      // prescription: "",
      nurse_notes: "",
      // actions: "",
      // common_reasons: "",
      // reasons: "",
      temperature: "",
      pulse_rate: "",
      respiratory_rate: "",
      blood_pressure: "",
      oxygen_saturation: "",
      pain_scale: "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    const getPatient = async (patientId: string) => {
      try {
        const data = await fetchPatientAdmissionData(patientId); // Pass id directly

        setPatient(data);
        reset(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (typeof patientId === "string") {
      getPatient(patientId);
    }
  }, [patientId, reset]);

  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd");

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

  const onSubmit = async (formData: z.infer<typeof ModifiedPatientAdmissionSchema>) => {
    const payload = {
      row_id: id,
      emasOnDuty: fullname ?? "",
      timestamp: format(now, "yyyy-MM-dd HH:mm:ss") ?? "",
      ...formData,
    };
    // console.log(payload)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/newedit`, {
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
          text: "Patient data has been updated successfully.",
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
      alert("Failed to connect to the server");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
        {/* {isMounted && (
    <>
      {isNewStudent ? (
        <input
          type="text"
          placeholder="Enter new student ID"
          onChange={(e) => form.setValue('student_id', e.target.value)} // Update form value on change
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
              noOptionsMessage={() => (
                <div
                  onClick={() => {
                    const newOption = {
                      value: 'insert_new',
                      label: 'Insert new student?',
                      student_id: '',
                      first_name: '',
                      last_name: '',
                      email: '',
                      sex: 'male' as 'male' | 'female',
                      address: '',
                      date_of_birth: '',
                      contact: '',
                      department: '',
                    };
                    field.onChange(newOption);
                    handleStudentChange(newOption); // Clear existing fields
                  }}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Insert new student?
                </div>
              )}
            />
          )}
        />
      )}
    </>
  )} */}

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => <Input {...field} className="w-[250px]" placeholder="Student ID" disabled />}
          />

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Firstname" disabled />
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
                  <Input {...field} className="w-[250px]" placeholder="Lastname" disabled />
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
                  <Input {...field} className="w-[250px]" placeholder="Email" disabled />
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
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)} disabled>
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
                <Popover modal={true}>
                  <PopoverTrigger asChild disabled>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal flex",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(parse(field.value, "yyyy-MM-dd", new Date()), "P")
                        ) : (
                          <span>Birthdate</span>
                        )}
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
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Home Address" disabled />
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
                  <Input {...field} className="w-[250px]" placeholder="Contact Number" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {patient && (
            <>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)} disabled>
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
            </>
          )}
        </div>

        <div className="flex flex-row gap-4">
          {/* <FormField
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
            name="vital_signs"
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
          name="nurse_notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} className="w-[250px]" placeholder="Nurse notes" rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Temperature" />
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
                <FormLabel>Pulse rate</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Pulse rate" />
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
                <FormLabel>Respiratory rate</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Respiratory rate" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* <FormField
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

          {patient && (
            <>
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
            </>
          )}

          <FormField
            control={form.control}
            name="reasons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="w-[250px]" placeholder="Reasons" rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="blood_pressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Blood Pressure" />
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
                <FormLabel>Oxygen Saturation</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Oxygen Saturation" />
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
                <FormLabel>Pain Scale</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" placeholder="Pain Scale" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nurse_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nurse notes</FormLabel>
              <FormControl>
                <Textarea {...field} className="w-[250px]" placeholder="Nurse notes" rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3>Edited by: {fullname ?? ""}</h3>
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
