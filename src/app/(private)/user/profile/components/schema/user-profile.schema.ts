import { z } from "zod";

export const userProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(1, "Enter a valid phone number"),
  address: z.string().min(1, "Enter a valid address")
});
