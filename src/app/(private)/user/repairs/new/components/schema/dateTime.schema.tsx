import { z } from "zod";

export const dateTimeSchema = z.object({
  preferredDate: z.date({ message: "Please select a date" }).optional(),
  preferredTime: z.string().min(1, "Please select a time"),
  customTime: z.string().optional()
});

export type DateTime = z.infer<typeof dateTimeSchema>;
