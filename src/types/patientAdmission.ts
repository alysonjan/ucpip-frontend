import { z } from "zod";

export const patientAdmissionSchema = z.object({
  student_id: z.string(),
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
  department: z.coerce.string(),
  department_name: z.coerce.string().optional(),
  cases: z.string().optional(),
  vitalSigns: z.string().optional(),
  actions: z.string().optional(),
  common_reasons: z.string().optional(),
  reasons: z.string().optional(),
  prescription: z.string().optional(),
  nurseNotes: z.string().optional(),
  emasOnDuty: z.string().optional(),
  timestamp: z.string().optional(),

  temperature: z.string().optional(),
  pulse_rate: z.string().optional(),
  respiratory_rate: z.string().optional(),
  blood_pressure: z.string().optional(),
  oxygen_saturation: z.string().optional(),
  pain_scale: z.string().optional(),
  // services: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

export type PatientAdmissionSchema = z.infer<typeof patientAdmissionSchema>;
