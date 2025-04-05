import { z } from "zod";

export const vaccinationFormSchema = z.object({
  vaccination_given: z.string().nonempty("Vaccination given is required"), // Required with a custom error message
  dose_no: z.string().nonempty("Dose number is required"), // Required with a custom error message
  purpose: z.string().nonempty("Purpose is required"), // Required with a custom error message

  // dose_no: z.enum(["1st Dose", "2nd Dose", "3rd Dose", "Booster"]),
  // purpose: z.enum(["Hospital Duty", "Internship", "Prophylaxis", "Other"]),
});

export type VaccinationFormSchema = z.infer<typeof vaccinationFormSchema>;
