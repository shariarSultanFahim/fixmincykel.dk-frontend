import { z } from "zod";

export const rescheduleFormSchema = z
  .object({
    scheduleStart: z.date({
      message: "Select a start date and time."
    }),
    scheduleEnd: z.date({
      message: "Select an end date and time."
    })
  })
  .refine((data) => data.scheduleEnd > data.scheduleStart, {
    message: "End time must be after start time",
    path: ["scheduleEnd"]
  });
