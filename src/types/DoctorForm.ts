import { z } from "zod";

export const doctorFormSchema = z.object({
  id: z.number().optional(),
  fullname: z.string().nonempty("This is required"),
  prc_license: z.string().nonempty("This is required"),
});

export type DoctorFormSchema = z.infer<typeof doctorFormSchema>;
