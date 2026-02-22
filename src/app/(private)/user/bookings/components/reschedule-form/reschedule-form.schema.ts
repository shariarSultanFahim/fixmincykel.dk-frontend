import { z } from "zod";

export const rescheduleFormSchema = z.object({
  dateTime: z.date({
    message: "Select a new date and time."
  }),
  note: z.string().max(240, "Keep the note under 240 characters.").optional()
});
