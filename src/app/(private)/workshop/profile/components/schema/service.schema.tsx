import { z } from "zod";

const workshopDays = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
] as const;

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format");

const openingHourItemSchema = z
  .object({
    day: z.enum(workshopDays),
    openTime: timeSchema,
    closeTime: timeSchema,
    isClosed: z.boolean()
  })
  .superRefine((value, ctx) => {
    if (value.isClosed) {
      return;
    }

    if (value.openTime >= value.closeTime) {
      ctx.addIssue({
        code: "custom",
        message: "Opening time must be earlier than closing time",
        path: ["closeTime"]
      });
    }
  });

export const serviceSchema = z.object({
  serviceCategories: z.array(z.string()).min(1, "Select at least one category"),
  openingHours: z.array(openingHourItemSchema).length(7, "All weekdays must be configured")
});
