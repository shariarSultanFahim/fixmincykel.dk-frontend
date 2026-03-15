import { z } from "zod";

export const detailsSchema = z.object({
  repairIssue: z.string().trim().min(1, "Please enter a title for your repair request"),
  repairDescription: z
    .string()
    .trim()
    .min(1, "Please provide a repair description")
    .max(500, "Description must be less than 500 characters"),
  categories: z
    .array(
      z.object({
        categoryId: z.string().min(1, "Category is required"),
        description: z
          .string()
          .trim()
          .min(1, "Category description is required")
          .max(500, "Description must be less than 500 characters")
      })
    )
    .min(1, "Please select at least one category")
});
