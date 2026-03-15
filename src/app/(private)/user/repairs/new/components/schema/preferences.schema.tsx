import { z } from "zod";

export const preferencesSchema = z.object({
  address: z.string().trim().min(1, "Please enter your address"),
  postalCode: z
    .string()
    .trim()
    .min(1, "Please enter postal code")
    .regex(/^\d{4}$/, "Postal code must be 4 digits"),
  maximumDistance: z
    .string()
    .trim()
    .min(1, "Please enter maximum distance")
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: "Maximum distance must be greater than 0"
    })
});
