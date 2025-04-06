"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// Define the schema with Zod
const ForgotPasswordSchema = z.object({
  email: z.string().email(),
  // password: z.string(),
  // confirm_password: z.string(),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle error messages
  const [loading, setLoading] = useState(false); // State for loading status

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      // password: "",
      // confirm_password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setLoading(true);
    setErrorMessage(null); // Reset the error message
    try {
      // Check if passwords match
      // if (data.password !== data.confirm_password) {
      //   setErrorMessage("Password must match!");
      //   return;
      // }

      const payload = {
        action: "send_email",
        ...data,
      };

      console.log(payload);

      // Send the request to create the password
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("We have sent you a password reset link. Please check your email to reset your password.");
      } else {
        setErrorMessage(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setErrorMessage("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Reset Password</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col w-96">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Enter your registered email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value || ""} />
                </FormControl>
                <FormDescription>Enter your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value || ""} />
                </FormControl>
                <FormDescription>Confirm your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button className="px-40" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </Form>
    </>
  );
}
