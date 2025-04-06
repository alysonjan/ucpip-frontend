import { z } from "zod";

export const physicalExamFormSchema = z.object({
  status: z.string().nonempty("Status is required"),
  physical_exam_remarks: z.string().nonempty("Remarks is required"),
});

export type PhysicalExamFormSchema = z.infer<typeof physicalExamFormSchema>;
