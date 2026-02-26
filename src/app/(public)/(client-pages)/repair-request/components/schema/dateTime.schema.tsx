import { z } from "zod";

function parseTimeString(timeStr: string): { hours: number; minutes: number } {
  // Handle 24-hour format (HH:MM)
  if (timeStr.includes(":") && !timeStr.includes("AM") && !timeStr.includes("PM")) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  }

  // Handle 12-hour format (HH:MM AM/PM)
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  throw new Error("Invalid time format");
}

export const dateTimeSchema = z
  .object({
    preferredDate: z.date({ message: "Please select a date" }),
    preferredTime: z.string().optional(),
    customTime: z.string().optional(),
    additionalNotes: z.string().optional()
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
  )
  .transform((data) => {
    const timeStr = data.customTime || data.preferredTime || "";

    if (!data.preferredDate || !timeStr) {
      return {
        ...data,
        utcDateTime: null
      };
    }

    try {
      const { hours, minutes } = parseTimeString(timeStr);

      // Create a date object with the selected date and time
      const localDateTime = new Date(data.preferredDate);
      localDateTime.setHours(hours, minutes, 0, 0);

      // Convert to UTC ISO string
      const utcDateTime = localDateTime.toISOString();

      return {
        ...data,
        utcDateTime
      };
    } catch {
      return {
        ...data,
        utcDateTime: null
      };
    }
  });

export type DateTime = z.infer<typeof dateTimeSchema>;
