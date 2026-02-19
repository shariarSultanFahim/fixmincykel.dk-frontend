import { z } from "zod";

export const bikeSchema = z.object({
  name: z.string().min(2, "Bike name is required"),
  type: z.string().min(2, "Type is required"),
  year: z.string().min(4, "Year is required"),
  color: z.string().min(2, "Color is required"),
  frameSize: z.string().min(2, "Frame size is required")
});
