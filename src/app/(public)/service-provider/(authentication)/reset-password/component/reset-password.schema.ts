import { z } from "zod";

export function createResetEmailSchema() {
  return z.object({
    email: z.email("Enter a valid email.")
  });
}

export function createResetOtpSchema() {
  return z.object({
    otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit code.")
  });
}

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

export type ResetEmailFormValues = z.infer<ReturnType<typeof createResetEmailSchema>>;
export type ResetOtpFormValues = z.infer<ReturnType<typeof createResetOtpSchema>>;
export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;
