import { z } from "zod";

export const detailsSchema = z.object({
  repairIssue: z.string().optional(),
  categories: z
    .array(
      z.object({
        categoryId: z.string().min(1, "Category is required"),
        description: z.string().max(500, "Description must be less than 500 characters").optional()
      })
    )
    .min(1, "Please select at least one category"),
  urgency: z.enum(["Low", "Medium", "High"]).default("Medium")
});

export type Details = z.infer<typeof detailsSchema>;
