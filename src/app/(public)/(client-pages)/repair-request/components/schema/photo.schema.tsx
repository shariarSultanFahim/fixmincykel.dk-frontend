import { z } from "zod";

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

export const photoSchema = z.object({
  photos: z
    .array(z.custom<File>(isFile, "Please upload valid image files"))
    .min(1, "Please upload at least one photo")
    .max(5, "You can upload up to 5 photos")
    .default([])
});

export type Photo = z.infer<typeof photoSchema>;
