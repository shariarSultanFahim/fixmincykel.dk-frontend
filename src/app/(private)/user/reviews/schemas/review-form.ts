import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating.")
    .max(5, "Please select a rating between 1 and 5."),
  comment: z
    .string()
    .min(10, "Please share at least 10 characters.")
    .max(500, "Review must be 500 characters or fewer.")
});
