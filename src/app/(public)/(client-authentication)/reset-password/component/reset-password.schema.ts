import { z } from "zod";

export function createResetPasswordSchema() {
  return z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters."),
      confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters.")
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"]
    });
}

export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;
