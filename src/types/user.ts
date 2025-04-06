import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  email: z.string().email(),
  temp_password: z.string().min(2).max(100),
  role: z.enum(["staff", "admin", "super_admin"]),
  // role: z.enum(["super_admin", "staff"]),

  active: z.number().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
