import { z } from "zod";

export const medicalCertFormSchema = z.object({
  medcert_data: z.string().nonempty("This is required"),
  medcert_remarks: z.string().nonempty("Remarks is required"),
});

export type MedicalCertFormSchema = z.infer<typeof medicalCertFormSchema>;
