"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

// Define the schema with Zod
const CreatePasswordSchema = z.object({
  email: z.string().email(), 
  password: z.string(),
  confirm_password: z.string()
});

export default function CreatePassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to handle error messages
  const [loading, setLoading] = useState(false); // State for loading status

  const form = useForm<z.infer<typeof CreatePasswordSchema>>({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      email: '',     
      password: '',
      confirm_password: ''  
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof CreatePasswordSchema>) => {
    setLoading(true);
    setErrorMessage(null); // Reset the error message
    try {
        // Check if passwords match
        if (data.password !== data.confirm_password) {
            setErrorMessage('Password must match!');
            return;
        }

        // Send the request to create the password
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Show success alert
            console.log('Login successful', result);
            // Here, you can use a library like SweetAlert2 or your preferred alert library
            // For example:
            Swal.fire({
                title: 'Success!',
                text: 'Password created successfully. Go to the login page?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Go to Login',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/signin');
                }
            });
            
        } else {
            // Handle different error messages returned by the API
            setErrorMessage(result.message || 'Failed to create password');
        }
    } catch (error) {
        console.error('Error during password creation:', error);
        setErrorMessage('Failed to connect to the server');
    } finally {
        setLoading(false);
    }
};


  return (
    <>
      <h1 className="text-3xl">Create Password.</h1>
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
                  <Input {...field} value={field.value || ''} />
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
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value || ''} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value || ''} />
                </FormControl>
                <FormDescription>Confirm your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="px-40" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </>
  );
}
