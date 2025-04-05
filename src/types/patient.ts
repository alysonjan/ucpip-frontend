import { z } from "zod";

export const patientSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  sex: z.enum(["male", "female"]),
  contact: z.string().regex(/^[0-9+\-\s()]{10,20}$/, {
    message: "Invalid contact number format",
  }),
  email: z.string().email(),
  address: z.string(),
  date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  student_id: z.string().optional(),
  department: z.coerce.string(),
  height: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  bmi: z.string().optional().nullable(),
  bmi_category: z.string().optional().nullable(),

  existing_medical_condition: z.string().optional().nullable(),
  maintenance_medication: z.string().optional().nullable(),
  allergies: z.string().optional().nullable(),
  vaccination_link: z.string().optional().nullable(),
  family_hx_of_illness: z.string().optional().nullable(),
  // smoking: z.string().optional().nullable(),
  // drinking: z.string().optional().nullable(),
  smoking: z.enum(["Yes", "No"], { required_error: "Please select Yes or No for smoking." }),
  drinking: z.enum(["Yes", "No"], { required_error: "Please select Yes or No for drinking." }),
  health_insurance: z.string().optional().nullable(),

  patient_category: z.enum(["Normal", "Alert"]),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "N/A"], {
    required_error: "Please select a blood type.",
  }),

  action: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
});

export type PatientSchema = z.infer<typeof patientSchema>;
