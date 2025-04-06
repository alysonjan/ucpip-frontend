import { z } from "zod";

export const medicalFormSchema = z.object({
  chief_complaint: z.string().nonempty("Chief Complaint is required"),
  working_diagnosis: z.string().optional(),
  signs_and_symptoms: z.string().optional(),
  allergies: z.string().optional(),
  case_type: z.enum(["trauma", "medical"]),
  medication: z.string().optional(),
  quantity: z.string().optional(),
  past_medical_history: z.string().optional(),
  assessment: z.string().optional(),
  remarks: z.string().optional(),
  reason_for_consultation: z.string().optional(),
});

export type MedicalFormSchema = z.infer<typeof medicalFormSchema>;
