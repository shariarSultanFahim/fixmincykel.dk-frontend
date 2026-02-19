import { z } from "zod";

export const informationSchema = z.object({
  whichBike: z.string().min(1, "Please select a bike"),
  bikeType: z.string().min(1, "Please enter bike type"),
  bikeBrand: z.string().optional()
});

export type Information = z.infer<typeof informationSchema>;
