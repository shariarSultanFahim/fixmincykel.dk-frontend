import { z } from "zod";

export const locationSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().min(1, "Please enter your city"),
  address: z.string().min(1, "Please enter your address")
});

export type Location = z.infer<typeof locationSchema>;
