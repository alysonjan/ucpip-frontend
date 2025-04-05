import { z } from "zod";

export const chiefComplaintFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("This is required"),
});

export type ChiefComplaintFormSchema = z.infer<typeof chiefComplaintFormSchema>;
