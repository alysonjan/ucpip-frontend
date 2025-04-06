export interface PatientAdmissionDetailsType {
  id: number;
  first_name: string;
  last_name: string;
  sex: "male" | "female"; // You can adjust this as necessary
  contact: string;
  email: string;
  address: string;
  date_of_birth: string; // Consider using Date type if you parse this as a date
  student_id: string;
  department: string; // If you have a specific type for departments, use that
  profile_photo: string;
  height: string | null;
  weight: string | null;
  bmi: string | null;
  bmi_category: string | null;
  existing_medical_condition: string | null;
  maintenance_medication: string | null;
  allergies: string | null;
  vaccination_link: string | null;
  family_hx_of_illness: string | null;
  smoking: string | null; // If you want to represent smoking as a boolean
  drinking: string | null; // If you want to represent drinking as a boolean
  health_insurance: string | null;
  patient_category: string | null;
  blood_type: string | null;
  deleted: number; // Consider changing to a boolean if it only indicates deletion status
  department_name: string;
  cases: string;
  vital_signs: string;
  temperature: string;
  pulse_rate: string;
  respiratory_rate: string;
  blood_pressure: string;
  oxygen_saturation: string;
  pain_scale: string;
  services: string;
  actions: string;
  common_reasons: string;
  reasons?: string;
  prescription: string;
  nurse_notes: string;
  emas_on_duty: string;
  timestamp: string; // Consider using Date type if you parse this as a date
}
