"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { medicalFormSchema, MedicalFormSchema } from "@/types/medicalForm";
import { useEffect, useState } from "react";
import { ChiefComplaintFormSchema } from "@/types/ChiefComplaintFormSchema";

type MedicalFormProps = {
  data: any; // Or a more specific type if you know the structure
  onContinue: (tab: string) => void; // Ensure this is typed correctly
  setActiveTab: (tab: string) => void; // Ensure this is typed correctly
};

export const MedicalForm: React.FC<MedicalFormProps> = ({ data, onContinue, setActiveTab }) => {
  // const isMedicalOnly = data.services.length === 1 && data.services.includes("medical");
  const [isLastService, setIsLastService] = useState(false);
  const [chiefComplaint, setChiefComplaint] = useState<ChiefComplaintFormSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiefComplaints = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chief-complaints`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setChiefComplaint(data);
      } catch (error) {
        console.error("Failed to fetch Chief Complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChiefComplaints();

    // Calculate and set `isLastService` whenever `data.services` changes
    const sortedServices = [...(data.services || [])].sort(
      (a, b) => predefinedOrder.indexOf(a) - predefinedOrder.indexOf(b)
    );

    const currentServiceIndex = sortedServices.findIndex((service) => service === "health_concern");
    setIsLastService(currentServiceIndex + 1 >= sortedServices.length);
  }, [data.services]);
  // const predefinedOrder = ["medical", "trauma", "vaccination"];
  const predefinedOrder = ["health_concern", "physical_exam", "med_certificate", "vaccination"];

  const form = useForm<MedicalFormSchema>({
    resolver: zodResolver(medicalFormSchema),
    defaultValues: {
      chief_complaint: "",
      working_diagnosis: "",
      signs_and_symptoms: "",
      allergies: "",
      case_type: "trauma",
      medication: "",
      quantity: "",
      past_medical_history: "",
      assessment: "",
      remarks: "",
      reason_for_consultation: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof medicalFormSchema>) => {
    const payload = {
      consultation_service: "health_concern",
      ...data,
      ...formData,
    };

    // Check if there are services and determine the current service index
    const services = payload.services || [];
    if (services.length === 0) {
      console.error("No services selected");
      return;
    }

    // Sort services and determine the next service
    const sortedServices = [...(payload.services || [])].sort(
      (a, b) => predefinedOrder.indexOf(a) - predefinedOrder.indexOf(b)
    );

    const currentServiceIndex = sortedServices.findIndex((service) => service === "health_concern");
    const nextServiceIndex = currentServiceIndex + 1;

    if (nextServiceIndex < sortedServices.length) {
      const nextService = sortedServices[nextServiceIndex];

      // ###########################################################################################################
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/new-consultation`, {
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
          console.log("success");
        } else {
          console.error(result.message || "Insert failed");
        }
      } catch (error) {
        alert("Failed to connect to the server");
      }
      // ###########################################################################################################

      onContinue(`${nextService}_form`);
    } else {
      // Final step for the last service
      console.log("Final payload:", payload);
      // ###########################################################################################################
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient-admission/new-consultation`, {
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
      // ###########################################################################################################
    }
  };

  // const commonIllnesses = [
  //   "Allergy",
  //   "Back Pain",
  //   "Chest Pain",
  //   "Cold",
  //   "Cough",
  //   "Diarrhea",
  //   "Dizziness",
  //   "Fatigue",
  //   "Fever",
  //   "Headache",
  //   "Injury",
  //   "Joint Pain",
  //   "Muscle Pain",
  //   "Nausea",
  //   "Other",
  //   "Rash",
  //   "Shortness of Breath",
  //   "Skin Irritation",
  //   "Sore Throat",
  //   "Stomach Pain",
  //   "Vomiting",
  // ];

  const backToForm = () => {
    setActiveTab("patient_info_form");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
          <div className="flex flex-col items-center space-y-10 p-16 bg-gray-100 rounded-lg shadow-md w-[800px] mx-auto">
            <h2 className="text-2xl font-bold text-gray-700">Health Concern Assessment</h2>
            <FormField
              control={form.control}
              name="chief_complaint"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Chief Complaint <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        {" "}
                        {/* Make the trigger full width */}
                        <SelectValue placeholder="Chief Complaint" />
                      </SelectTrigger>
                      <SelectContent>
                        {" "}
                        {/* Ensure content is also wide */}
                        {chiefComplaint?.map((dt, index) => (
                          <SelectItem key={index} value={dt.name}>
                            {dt.name}
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
              name="working_diagnosis"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Working Diagnosis <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signs_and_symptoms"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Signs and Symptoms <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
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
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Allergies <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="case_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Case Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value="trauma"
                          checked={field.value === "trauma"}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Trauma</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value="medical"
                          checked={field.value === "medical"}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Medical</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medication"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Medication <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Quantity <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="past_medical_history"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Past Medical History <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="assessment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Assessment <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Remarks <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason_for_consultation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-gray-600">
                    Reason for Consultation <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button className="w-[300px] m-2" type="button" onClick={() => backToForm()}>
                Back
              </Button>
              <Button className="w-[200px] m-2" type="submit">
                {isLastService ? "Save" : "Continue"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MedicalForm;
