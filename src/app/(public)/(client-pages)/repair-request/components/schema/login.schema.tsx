import { z } from "zod";

export const loginSchema = z
  .object({
    fullName: z.string().min(1, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type Login = z.infer<typeof loginSchema>;
