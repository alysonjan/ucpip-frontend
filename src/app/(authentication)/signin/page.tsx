"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the schema with Zod
const SignInFormSchema = z.object({
  email: z.string().email().min(5).max(64),
  password: z.string().min(2).max(32),
  persistance: z.boolean().default(false),
});

export default function SignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle error messages
  const [loading, setLoading] = useState(false); // State for loading status

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      persistance: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    setLoading(true);
    setErrorMessage(null); // Reset the error message
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("fullname", result.fullname);
        localStorage.setItem("role", result.role);

        router.push("/dashboard");
      } else {
        setErrorMessage(result.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Welcome back.</h1>
      <p className="mb-2">
        Don&lsquo;t have an account yet? <Link href="signup">Sign up</Link>.
      </p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col w-96">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Enter your registered email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value || ""} />
                </FormControl>
                <FormDescription>Enter your account password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="px-40" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="flex justify-between">
            <Link
              href="/forgot-password"
              className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
