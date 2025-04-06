"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, getBMICategory } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { patientSchema, PatientSchema } from "@/types/patient";
import { Card } from "@/components/ui/card";
import Swal from "sweetalert2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CirclePlus, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PatientCategory = "Normal" | "Alert";

export default function AddPatientForm() {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // State to control dialog visibility
  const [newDepartmentName, setNewDepartmentName] = useState(""); // Local state for name input field

  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      sex: "male", // Default can be 'male' or 'female'
      contact: "",
      email: "",
      address: "",
      date_of_birth: "", // Ensure the default format is valid if needed
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
      action: "add",
    },
  });

  const { control, setValue, watch } = form;
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

  const onSubmit = async (formData: z.infer<typeof patientSchema>) => {
    const payload = {
      profile_photo: "default-profile.png",
      ...formData,
    };

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

  const getBMICategoryColor = (bmi: number | null) => {
    // Handle null and 0 cases first
    if (bmi === null || bmi === 0 || isNaN(bmi)) {
      // Return empty category for null, 0, or invalid BMI values
      return { category: "", color: "" };
    }

    // Check BMI categories
    if (bmi < 18.5) {
      return { category: "Underweight", color: "text-blue-500" };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return { category: "Normal", color: "text-green-500" };
    } else if (bmi >= 25 && bmi < 29.9) {
      return { category: "Overweight", color: "text-yellow-500" };
    } else {
      return { category: "Obese", color: "text-red-500" };
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

  // Function to handle form submission for updating the department
  const handleAddSubmit = async () => {
    try {
      if (newDepartmentName === "") {
        return;
      }
      const payload = {
        name: newDepartmentName,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-department`, {
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
          text: result.message,
          confirmButtonText: "OK",
        });
        window.location.reload();
      } else {
        console.error(result.message || "Create failed");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.message || "Create failed",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to add department:", error);
    }
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true); // Open the modal
  };

  return (
    <>
      <Card className="col-span-7 shadow-md p-6 bg-gray-200 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            <h3 className="text-xl font-semibold">Patient Personal Information</h3>

            <div className="flex flex-wrap w-full">
              {/* <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-2">
                      Student ID <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[250px] m-2" placeholder="Student ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="m-2">
                      Student ID <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        maxLength={14} // Allows 2 digits, dash, 4 digits, dash, 5 digits
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          const formattedValue = inputValue
                            .slice(0, 11) // Limit to 11 digits
                            .replace(/^(\d{2})(\d{0,4})(\d{0,5})$/, "$1-$2-$3"); // Add dashes after 2nd and 6th digit
                          field.onChange(formattedValue); // Update field value
                        }}
                        className="w-[250px] m-2"
                        placeholder="Student ID"
                      />
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
                    <FormLabel className="m-2">
                      Firstname <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel className="m-2">
                      Lastname <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel className="m-2">
                      Sex <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel className="m-2">
                      Contact No. <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel className="m-2">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel className="m-2">
                      Home Address <span className="text-red-500">*</span>
                    </FormLabel>
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
                  <FormItem className="w-[150px] m-2">
                    <FormLabel className="m-2">
                      Birthdate <span className="text-red-500">*</span>
                    </FormLabel>
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

            <h3 className="text-xl font-semibold">
              Department <span className="text-red-500">*</span>
            </h3>

            <div className="flex flex-wrap w-full items-center">
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
              <CirclePlus onClick={() => handleAdd()} />
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
                render={({ field }) => {
                  const { category, color } = getBMICategoryColor(Number(field.value));
                  return (
                    <FormItem>
                      <FormLabel className="m-2">
                        BMI {category && <span className={`ml-4 font-semibold ${color}`}>{category}</span>}
                      </FormLabel>
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
                  );
                }}
              />

              {/* ################################################################################################# */}

              {/* <div>
                <FormField
                  control={control}
                  name="bmi_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-2">BMI Category</FormLabel>
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
              </div> */}

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

            {/* ################################################################################################# */}

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

            <div className="flex justify-center">
              <Button className="w-[200px] m-2" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* <Card className="col-span-4 h-60 shadow-md">
      <CardHeader>Clinic Visit Log</CardHeader>
      <CardContent>
        <Table></Table>
      </CardContent>
    </Card>


  <Card className="col-span-7 shadow-md p-6 ">
      <CardHeader>Patient History</CardHeader>
      <CardContent>
        <Table></Table>
      </CardContent>
  </Card>
 */}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Department</DialogTitle>
            <DialogDescription>Department Name</DialogDescription>
          </DialogHeader>
          <div>
            <input
              id="departmentName"
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)} // Handle input change
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button
              className="mt-4"
              onClick={handleAddSubmit} // Handle save/update here
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
