import { z } from "zod";

export const detailsSchema = z.object({
  repairIssue: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  urgency: z.enum(["Low", "Medium", "High"]).default("Medium")
});

export type Details = z.infer<typeof detailsSchema>;
