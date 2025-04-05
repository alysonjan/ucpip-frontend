"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userSchema, UserSchema } from "@/types/user";
import { z } from "zod";

export default function NewUserForm() {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      temp_password: "newuser12345",
      role: "staff",
    },
  });

  const onSubmit = async (formData: z.infer<typeof userSchema>) => {
    const payload = {
      firstname: formData.first_name,
      lastname: formData.last_name,
      email: formData.email,
      temp_password: formData.temp_password,
      role: formData.role,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`, {
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
          text: "User created successfully.",
          confirmButtonText: "OK",
        });
        // window.location.reload();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full max-w-[500px] mx-auto">
        {/* First Name Field */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>

              <FormControl>
                <Input {...field} className="w-full" placeholder="First name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>

              <FormControl>
                <Input {...field} className="w-full" placeholder="Last name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input {...field} className="w-full" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Temp Password Field */}
        <FormField
          control={form.control}
          name="temp_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temporary Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Password"
                  type="password"
                  value="newuser12345" // Set the default value
                  readOnly // Make it read-only so it cannot be changed
                />
              </FormControl>
              <FormMessage />
              {/* Small label with green text */}
              <small className="text-green-600">
                New user will have a default password "newuser12345". Once activated, the user will change their own
                password.
              </small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>

              <FormControl>
                <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userSchema.shape.role.options.map((option) => (
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

        {/* Submit Button */}
        <div style={{ marginTop: "5rem" }} className="flex justify-center">
          <Button type="submit" className="w-full max-w-[200px]">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
