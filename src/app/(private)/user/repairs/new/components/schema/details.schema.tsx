import { z } from "zod";

export const detailsSchema = z.object({
  repairIssue: z.string().min(1, "Please select what needs to be repaired"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  urgency: z.enum(["Low", "Medium", "High"])
});

export type Details = z.infer<typeof detailsSchema>;
