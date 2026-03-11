import { z } from "zod";

export const blogSectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  content: z.string().min(10, "Section content must be at least 10 characters")
});

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tag: z.string().min(1, "Tag is required"),
  readTime: z.string().min(1, "Read time is required"),
  date: z.string().min(1, "Date is required"),
  image: z.custom<File | string>(
    (val) => val instanceof File || (typeof val === "string" && val.length > 0),
    { message: "Please upload a cover image" }
  ),
  imageAlt: z.string().min(1, "Image alt text is required"),
  category: z.enum(["for-cyclists", "for-workshop", "tech-tips"], {
    required_error: "Please select a category"
  }),
  sections: z.array(blogSectionSchema).min(1, "Add at least one section")
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
