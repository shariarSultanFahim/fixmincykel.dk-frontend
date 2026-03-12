"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useForgetPassword } from "@/lib/actions/auth/forget-password";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@/components/ui";

import {
  createForgetPasswordSchema,
  type ForgetPasswordFormValues
} from "./forget-password.schema";

export function FormForgetPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const forgetPasswordMutation = useForgetPassword();

  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(createForgetPasswordSchema()),
    defaultValues: { email: "" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await forgetPasswordMutation.mutateAsync(values);
      const message = response.message || response.data?.status || "Password reset email sent.";

      setSuccessMessage(message);
      toast.success(message);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Could not send reset email. Please try again.";

      setSuccessMessage("");
      toast.error(message);
    }
  });

  return (
    <section className="container flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-primary">
          <ChevronLeft className="size-4" />
          Back to login
        </Link>

        <div className="w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">FixMinCykel</p>
            <h1 className="text-2xl">Forgot your password?</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and we will send a reset link.
            </p>
          </div>

          {successMessage && (
            <p className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-navy">
              {successMessage}
            </p>
          )}

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        autoComplete="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={forgetPasswordMutation.isPending}>
                {forgetPasswordMutation.isPending ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
