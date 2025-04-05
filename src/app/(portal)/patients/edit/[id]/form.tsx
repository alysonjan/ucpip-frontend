"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, getBMICategory } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { patientSchema, PatientSchema } from "@/types/patient";
import { Card } from "@/components/ui/card";
import Swal from "sweetalert2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

type PatientCategory = "Normal" | "Alert";

interface EditPatientFormProps {
  id: string;
}

const fetchPatientById = async (id: string): Promise<PatientSchema> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};

// const EditPatientForm:FC<EditPatientFormProps> =   ({ patient, setSelectedPatient, fetchPatientById, id }) => {
const EditPatientForm: FC<EditPatientFormProps> = ({ id }) => {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  const [patientInfo, setPatientInfo] = useState<PatientSchema | null>(null);

  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      sex: "male",
      contact: "",
      email: "",
      address: "",
      date_of_birth: "",
      student_id: "",
      department: "",
      height: "",
      weight: "",
      bmi: "",
      bmi_category: "",
      existing_medical_condition: "",
      maintenance_medication: "",
      allergies: "",
      vaccination_link: "",
      family_hx_of_illness: "",
      smoking: "No",
      drinking: "No",
      health_insurance: "",
      patient_category: "Normal",
      blood_type: "A+",
      action: "edit",
    },
  });

  const { control, setValue, watch, reset } = form;
  const existingMedicalCondition = watch("existing_medical_condition");
  const maintenanceMedication = watch("maintenance_medication");
  const familyHxOfIllness = watch("family_hx_of_illness");

  // Watch height and weight values
  const height = watch("height");
  const weight = watch("weight");

  useEffect(() => {
    // Parse height and weight as floats, defaulting to 0 if undefined or null
    const heightInMeters = parseFloat(height ?? "0") / 100; // Convert cm to meters
    const weightInKg = parseFloat(weight ?? "0");

    // Check if height and weight are valid numbers
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      const bmiValue = parseFloat(bmi.toFixed(2)); // Round to 2 decimal places
      const bmiCategory = getBMICategory(bmiValue); // Get BMI category

      setValue("bmi", bmiValue.toFixed(2)); // Update the BMI field
      setValue("bmi_category", bmiCategory); // Update the BMI category field
    } else {
      setValue("bmi", ""); // Reset BMI if inputs are invalid
      setValue("bmi_category", ""); // Reset BMI category
    }
  }, [height, weight, setValue]);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const response = await fetchPatientById(id);
        if (response) {
          setPatientInfo(response);
          // Ensure the form is reset with the correct shape of data
          reset(response);
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient(id);
  }, [id, reset]);

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
  }, []);

  const onSubmit = async (formData: PatientSchema) => {
    const payload = {
      action: "edit",
      ...formData,
    };
    // console.log(payload)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/save`, {
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

  const getPatientCategory = (
    existingMedicalCondition: string,
    maintenanceMedication: string,
    familyHxOfIllness: string
  ): { category: PatientCategory; color: string } => {
    if (
      existingMedicalCondition.trim() !== "" ||
      maintenanceMedication.trim() !== "" ||
      familyHxOfIllness.trim() !== ""
    ) {
      return { category: "Alert", color: "text-red-500" }; // Red for Alert
    }
    return { category: "Normal", color: "text-green-500" }; // Green for Normal
  };

  useEffect(() => {
    const { category, color } = getPatientCategory(
      existingMedicalCondition ?? "", // Fallback to empty string
      maintenanceMedication ?? "", // Fallback to empty string
      familyHxOfIllness ?? "" // Fallback to empty string
    );

    setValue("patient_category", category); // No type error now
  }, [existingMedicalCondition, maintenanceMedication, familyHxOfIllness, setValue]);

  return (
    <>
      {patientInfo ? (
        <Card className="col-span-7 shadow-md p-6 bg-gray-200 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
              <div className="flex flex-wrap w-full">
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Student ID</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Student ID" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Firstname</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Firstname" />
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
                      <FormLabel className="m-2">Lastname</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Lastname" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="w-[150px] m-2">
                      <FormLabel className="m-2">Sex</FormLabel>

                      <FormControl>
                        <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sex" />
                          </SelectTrigger>
                          <SelectContent>
                            {patientSchema.shape.sex.options.map((option) => (
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
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Contact No.</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px]  m-2" placeholder="Contact No." />
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
                      <FormLabel className="m-2">Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px]  m-2" placeholder="Email" />
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
                      <FormLabel className="m-2">Home Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px]  m-2" placeholder="Home Address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="w-[150px]">
                      <FormLabel className="m-2">Birthdate</FormLabel>
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

              <h3 className="text-xl font-semibold">Department</h3>
              <div className="flex flex-wrap w-full">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="w-[250px] m-2">
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

              <h3 className="text-xl font-semibold">Statistics</h3>
              <div className="flex flex-wrap w-full">
                <FormField
                  control={control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[250px] m-2"
                          placeholder="Height (cm)"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[250px] m-2"
                          placeholder="Weight (kg)"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">BMI</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly // Make it read-only since it's calculated
                          className="w-[250px] m-2"
                          placeholder="BMI"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ############################################################################################################### */}

                <div>
                  <FormField
                    control={control}
                    name="bmi_category"
                    render={({ field }) => (
                      <FormItem>
                        <TooltipProvider>
                          <Tooltip>
                            {/* Tooltip Trigger is wrapped around the FormLabel */}
                            <TooltipTrigger asChild>
                              <FormLabel className="m-2 cursor-pointer relative group flex items-center space-x-2">
                                <span>BMI Category</span>
                                {/* Info Icon */}
                                <Info
                                  className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300"
                                  size={18}
                                />
                                <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                              </FormLabel>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                <strong>BMI Chart:</strong>
                              </p>
                              <ul>
                                <li className="text-red-500">Less than 18.5: Underweight</li>
                                <li className="text-green-500">18.5 to 24.9: Normal weight</li>
                                <li className="text-yellow-500">25.0 to 29.9: Overweight</li>
                                <li className="text-orange-500">30.0 to 34.9: Obesity (Class 1)</li>
                                <li className="text-orange-700">35.0 to 39.9: Obesity (Class 2)</li>
                                <li className="text-red-700">40.0 and above: Obesity (Class 3)</li>
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-[250px] m-2"
                            placeholder="BMI Category"
                            value={field.value ?? ""}
                            readOnly // Make it read-only since it's auto-calculated
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold">Health Information</h3>
              <div className="flex flex-wrap w-full">
                <FormField
                  control={form.control}
                  name="existing_medical_condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Existing Medical Condition</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[250px] m-2"
                          placeholder="Existing Medical Condition"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenance_medication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Maintenance Medication</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[250px] m-2"
                          placeholder="Maintenance Medication"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Allergies</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Allergies" value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaccination_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Vaccination</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-[250px] h-[100px] m-2" // Adjust height as needed
                          placeholder="Vaccination"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="family_hx_of_illness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Family Hx of illness</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[250px] m-2"
                          placeholder="Family Hx of illness"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="smoking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Smoking</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Smoking" value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="drinking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Drinking</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[250px] m-2" placeholder="Drinking" value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="smoking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Smoking</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4 m-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Yes"
                              checked={field.value === "Yes"}
                              onChange={() => field.onChange("Yes")}
                              className="checkbox"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="No"
                              checked={field.value === "No"}
                              onChange={() => field.onChange("No")}
                              className="checkbox"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="drinking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Drinking</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4 m-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Yes"
                              checked={field.value === "Yes"}
                              onChange={() => field.onChange("Yes")}
                              className="checkbox"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="No"
                              checked={field.value === "No"}
                              onChange={() => field.onChange("No")}
                              className="checkbox"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="health_insurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Health Insurance</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[250px] m-2"
                          placeholder="Health Insurance"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-xl font-semibold">Health Status</h3>
              <div className="flex flex-wrap w-full">
                {/* <FormField
                  control={form.control}
                  name="patient_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">Patient Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[250px] m-2"
                          placeholder="Patient Category"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={control}
                  name="patient_category"
                  render={({ field }) => {
                    const { category, color } = getPatientCategory(
                      existingMedicalCondition ?? "",
                      maintenanceMedication ?? "",
                      familyHxOfIllness ?? ""
                    );

                    return (
                      <FormItem>
                        <FormLabel>Patient Category</FormLabel>
                        <FormControl>
                          <div className={cn("font-bold", color)}>{category}</div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="blood_type"
                  render={({ field }) => (
                    <FormItem className="w-[250px] m-2">
                      <FormLabel className="m-2">Blood Type</FormLabel>
                      <FormControl>
                        <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blood Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bloodType) => (
                              <SelectItem key={bloodType} value={bloodType}>
                                {bloodType}
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

              <div className="flex justify-center items-center space-x-4">
                <Link href="/patients">
                  <Button>Back</Button>
                </Link>
                <Button className="w-[200px]" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      ) : (
        <div>Loading patient information...</div> // Display a loading state while `patientInfo` is `null`
      )}
    </>
  );
};

export default EditPatientForm;
