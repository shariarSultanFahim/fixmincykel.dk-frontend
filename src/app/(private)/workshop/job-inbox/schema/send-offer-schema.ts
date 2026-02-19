import { z } from "zod";

export const sendOfferSchema = z.object({
  price: z.string().trim().min(1, "Price is required").regex(/^\d+$/, "Price must be a number"),
  estimatedTime: z.string().trim().min(1, "Estimated time is required"),
  message: z.string().trim().max(200, "Message is too long").optional()
});
