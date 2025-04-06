"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdmissionsFormSchema = z.object({
  id: z.string().min(2).max(32),
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  dob: z.date().min(new Date(1990, 0, 1)).max(new Date()),
  doe: z.string().min(2).max(128),
  reasons: z.string().min(2).max(128),
  action: z.string().min(2).max(128),
});

export default function AdmissionsForm({ data }: { data?: z.infer<typeof AdmissionsFormSchema> }) {
  const form = useForm<z.infer<typeof AdmissionsFormSchema>>({
    resolver: zodResolver(AdmissionsFormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-4 flex flex-col w-full">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the patient&lsquo;s university-provided ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the patient&lsquo;s first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the patient&lsquo;s last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Entry</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal flex", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "P") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    captionLayout="dropdown-buttons"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select the patient&lsquo;s date of birth.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reasons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reasons</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the patient&lsquo;s reasons for admission.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actions</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the actions taken.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
