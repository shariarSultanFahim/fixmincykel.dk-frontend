import { z } from "zod";

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format");

export const serviceSchema = z.object({
  serviceCategories: z.array(z.string()).min(1, "Select at least one category"),
  openingHours: z.object({
    weekdaysStart: timeSchema,
    weekdaysEnd: timeSchema,
    saturdayStart: timeSchema,
    saturdayEnd: timeSchema
  }),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    inApp: z.boolean()
  })
});
