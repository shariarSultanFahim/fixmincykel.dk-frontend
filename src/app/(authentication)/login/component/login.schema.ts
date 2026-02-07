import { z } from "zod";

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t("emailInvalid")),
    password: z.string().min(6, t("passwordMin"))
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
