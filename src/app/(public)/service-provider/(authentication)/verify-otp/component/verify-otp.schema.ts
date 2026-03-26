import { z } from "zod";

export function createVerifyOTPSchema() {
  return z.object({
    email: z.email("Please enter a valid email address"),
    otp: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit code")
  });
}

export type VerifyOTPFormValues = z.infer<ReturnType<typeof createVerifyOTPSchema>>;
