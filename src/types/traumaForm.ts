import { z } from "zod";

export const traumaFormSchema = z.object({
  trauma_information: z.string().nonempty("Trauma Information is required"),
  management: z.string().nonempty("Management is required"),
  supplies: z.string().nonempty("Supplies are required"),

  // management: z.enum([
  //   "First Aid",
  //   "Teleconsult",
  //   "Vital Signs Monitoring",
  //   "Management of Common Symptoms",
  //   "Vaccination",
  //   "Reffered to OPD/ER",
  //   "MedCert",
  //   "Clinic Note",
  //   "Reffered to the University Physician",
  // ]),
  // supplies: z.enum([
  //   "None",
  //   "Bandaid",
  //   "Disposable syringe with needle 10cc",
  //   "Disposable syringe with needle 3cc",
  //   "Elastic Bandage",
  //   "Gauze Bandage",
  //   "Leukoplast Tape",
  //   "Omega",
  //   "Rosemed sterile gloves",
  //   "Povidone Iodine swabstick",
  //   "Sterile gauze pad",
  //   "Alcohol Swab",
  //   "Cotton tip applicator",
  //   "Single use hypodermic needles",
  //   "Leukoplast Tape 5x5",
  //   "Test Strip (one touch)",
  //   "Lancets (one touch)",
  //   "Disposable syringe with needle 1cc",
  //   "Clean gloves",
  // ]),
  trauma_quantity: z.string().nonempty("Trauma Quantity is required"),
});

export type TraumaFormSchema = z.infer<typeof traumaFormSchema>;
