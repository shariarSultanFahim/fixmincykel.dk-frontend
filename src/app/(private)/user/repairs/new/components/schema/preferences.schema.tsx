import { z } from "zod";

export const preferencesSchema = z.object({
  address: z.string().min(1, "Please enter your address"),
  maximumDistance: z.string().optional(),
  receiveSmsNotifications: z.boolean().default(false)
});

export type Preferences = z.infer<typeof preferencesSchema>;
