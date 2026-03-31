import { z } from "zod";

export const BIKE_TYPE_OPTIONS = [
  "ROAD",
  "MOUNTAIN",
  "HYBRID",
  "ELECTRIC",
  "BMX",
  "GRAVEL",
  "CRUISER",
  "OTHER"
] as const;

export const informationSchema = z.object({
  whichBike: z.string().min(1, "Please select a bike"),
  bikeType: z
    .string()
    .trim()
    .min(1, "Please select bike type")
    .refine((value) => BIKE_TYPE_OPTIONS.includes(value as (typeof BIKE_TYPE_OPTIONS)[number]), {
      message: "Please select a valid bike type"
    }),
  bikeBrand: z.string().optional()
});

export type Information = z.infer<typeof informationSchema>;
