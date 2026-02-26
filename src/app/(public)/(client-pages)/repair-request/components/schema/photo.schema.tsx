import { z } from "zod";

export const photoSchema = z.object({
  photos: z.array(z.string()).min(0, "Please upload at least one photo").default([])
});

export type Photo = z.infer<typeof photoSchema>;
