import { z } from "zod";

export function createForgetPasswordSchema() {
  return z.object({
    email: z.email("Enter a valid email.")
  });
}

export type ForgetPasswordFormValues = z.infer<ReturnType<typeof createForgetPasswordSchema>>;
