import { z } from "zod";

export const profileSchema = z.object({
  workshopName: z.string().min(2, "Workshop name is required"),
  address: z.string().min(5, "Address is required"),
  cvrNumber: z.string().regex(/^\d{8}$/, "CVR number must be 8 digits"),
  description: z.string().max(500, "Max 500 characters.")
});
