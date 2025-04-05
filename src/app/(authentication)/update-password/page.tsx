"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

// Define the schema with Zod
const ForgotPasswordSchema = z.object({
  password: z.string(),
  confirm_password: z.string(),
});

function UpdatePassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      if (data.password !== data.confirm_password) {
        setErrorMessage("Password must match!");
        return;
      }

      const payload = {
        email,
        action: "update_password",
        ...data,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Password created successfully. Go to the login page?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/signin");
          }
        });
      } else {
        setErrorMessage(result.message || "Failed to create password");
      }
    } catch (error) {
      console.error("Error during password creation:", error);
      setErrorMessage("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-blue-500">Create New Password.</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col w-96">
          <FormField
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
          />

          <FormField
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
          />
          <Button className="px-40" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}

// Wrap the UpdatePassword component in a Suspense boundary
export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword />
    </Suspense>
  );
}
