import { z } from "zod";

export const dateTimeSchema = z
  .object({
    preferredDate: z.date({ message: "Please select a date" }),
    preferredTime: z.string().optional(),
    customTime: z.string().optional()
  })
  .refine(
    (data) => {
      // At least one time selection is required
      return data.preferredTime || data.customTime;
    },
    {
      message: "Please select a time or enter a custom time",
      path: ["preferredTime"]
    }
  );
