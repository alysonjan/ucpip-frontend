"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpFormSchema = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  username: z.string().min(2).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  passwordConfirmation: z.string().min(8).max(32),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  return (
    <>
      <h1 className="text-3xl">Create an account.</h1>
      <p className="mb-2">
        Already have an account? <Link href="signin">Sign in</Link>.
      </p>
      <Form {...form}>
        <form className="space-y-2 flex flex-col w-96">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your first name.</FormDescription>
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
                <FormDescription>Enter your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your email.</FormDescription>
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
                  <Input {...field} />
                </FormControl>
                <FormDescription>Choose a password for your account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirmation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the password again.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign up</Button>
        </form>
      </Form>
    </>
  );
}
