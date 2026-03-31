import { z } from "zod";

export function createVerifyOTPSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t("emailInvalid")),
    otp: z
      .number()
      .min(0, t("otpMin"))
      .max(999999, t("otpMin"))
      .refine((val) => String(val).length === 6, t("otpMin"))
  });
}

export type VerifyOTPFormValues = z.infer<ReturnType<typeof createVerifyOTPSchema>>;
