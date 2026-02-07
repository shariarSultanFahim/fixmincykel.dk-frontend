import { z } from "zod";

export function createRegisterSchema(t: (key: string) => string) {
  return z
    .object({
      name: z.string().min(2, t("fullNameMin")),
      email: z.email(t("emailInvalid")),
      phone: z.string().min(11, t("phoneInvalid")),
      password: z.string().min(6, t("passwordMin")),
      confirmPassword: z.string().min(6, t("confirmPasswordMin"))
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirmPasswordMatch")
    });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
