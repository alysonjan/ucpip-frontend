"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { traumaFormSchema, TraumaFormSchema } from "@/types/traumaForm";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

type TraumaFormProps = {
  data: any; // Or a more specific type if you know the structure
  onContinue: (tab: string) => void; // Ensure this is typed correctly
};

export const TraumaForm: React.FC<TraumaFormProps> = ({ data, onContinue }) => {
  // const isTraumaOnly = data.services.length === 1 && data.services.includes("trauma");

  const predefinedOrder = ["medical", "trauma", "vaccination"];

  const [isLastService, setIsLastService] = useState(false);

  useEffect(() => {
    // Calculate and set `isLastService` whenever `data.services` changes
    const sortedServices = [...(data.services || [])].sort(
      (a, b) => predefinedOrder.indexOf(a) - predefinedOrder.indexOf(b)
    );

    const currentServiceIndex = sortedServices.findIndex((service) => service === "trauma");
    setIsLastService(currentServiceIndex + 1 >= sortedServices.length);
  }, [data.services]);
  const form = useForm<TraumaFormSchema>({
    resolver: zodResolver(traumaFormSchema),
    defaultValues: {
      trauma_information: "",
      management: "",
      supplies: "",
      trauma_quantity: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof traumaFormSchema>) => {
    const payload = {
      consultation_service: "trauma",
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

    const currentServiceIndex = sortedServices.findIndex((service) => service === "trauma");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full">
        <div className="flex flex-col items-center space-y-10 p-16 bg-gray-100 rounded-lg shadow-md w-[800px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700">Trauma Case Information </h2>
          {/* Vaccination Given Field */}
          <FormField
            control={form.control}
            name="trauma_information"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">
                  Trauma Information <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Explain here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Management Field */}
          {/* <FormField
            control={form.control}
            name="management"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">Management</FormLabel>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Management" />
                    </SelectTrigger>
                    <SelectContent>
                      {traumaFormSchema.shape.management?.options.map((option) => (
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
          /> */}
          <FormField
            control={form.control}
            name="management"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">
                  Management <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Explain here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Supplies Given/Used Field */}
          {/* <FormField
            control={form.control}
            name="supplies"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">Supplies Given/Used</FormLabel>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <SelectValue placeholder="Supplies" />
                    </SelectTrigger>
                    <SelectContent>
                      {traumaFormSchema.shape.supplies?.options.map((option) => (
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
          /> */}
          <FormField
            control={form.control}
            name="supplies"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">
                  Supplies Given/Used <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Explain here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trauma_quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-gray-600">
                  Quantity <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button className="w-[300px] m-2" type="submit">
              {isLastService ? "Save" : "Continue"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TraumaForm;
