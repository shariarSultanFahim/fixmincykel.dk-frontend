import { z } from "zod";

export const settingsSchema = z.object({
  platformFeePercentage: z
    .number()
    .min(0, "Fee must be 0% or higher")
    .max(100, "Fee must be 100% or lower"),
  maxJobRadius: z
    .number()
    .min(1, "Radius must be at least 1 km")
    .max(50, "Radius must be 50 km or lower"),
  newCategory: z.string().max(20, "Category name must be 20 characters or less").optional()
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
