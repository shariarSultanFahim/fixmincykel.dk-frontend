import { z } from "zod";

export const preferencesSchema = z.object({
  preferredLocation: z.string().optional(),
  maximumDistance: z.string().optional(),
  receiveSmsNotifications: z.boolean().default(false)
});

export type Preferences = z.infer<typeof preferencesSchema>;
