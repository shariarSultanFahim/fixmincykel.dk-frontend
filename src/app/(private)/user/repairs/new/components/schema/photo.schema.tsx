import { z } from "zod";

export const photoSchema = z.object({
  photos: z.array(z.string().url()).default([])
});

export type Photo = z.infer<typeof photoSchema>;
