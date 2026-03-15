import { z } from "zod";

export const bikeSchema = z.object({
  name: z.string().min(2, "Bike name is required"),
  type: z.string().trim().min(1, "Type is required"),
  brand: z.string().trim().min(2, "Brand is required"),
  model: z.string().trim().min(1, "Model is required"),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Year must be 4 digits"),
  color: z.string().trim().min(2, "Color is required")
});
