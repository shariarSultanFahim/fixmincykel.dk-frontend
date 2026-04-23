import { z } from "zod";

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

export const photoSchema = z.object({
  photos: z
    .array(
      z.custom<File>(isFile, "Please upload valid image files")
        .refine((file) => file.size <= 5 * 1024 * 1024, "Each image must be less than 5MB")
    )
    .min(1, "Please upload at least one photo")
    .max(3, "You can upload up to 3 photos")
    .default([])
});
