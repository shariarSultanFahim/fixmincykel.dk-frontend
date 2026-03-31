import { z } from "zod";

export const blogSectionSchema = z.object({
  heading: z.string().min(1, "Section heading is required"),
  details: z.string().min(10, "Section details must be at least 10 characters")
});

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  readTime: z.string().min(1, "Read time is required"),
  authorId: z.string().min(1, "Author id is required"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.custom<File | string | undefined>((val) => {
    if (val === undefined) return true;
    if (val instanceof File) return true;
    return typeof val === "string";
  }),
  sections: z.array(blogSectionSchema).min(1, "Add at least one section")
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
