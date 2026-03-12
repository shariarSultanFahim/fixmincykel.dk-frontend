"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useResetPassword } from "@/lib/actions/auth/reset-password";

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

import { createResetPasswordSchema, type ResetPasswordFormValues } from "./reset-password.schema";

export function FormResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordMutation = useResetPassword();
  const token = searchParams.get("token")?.trim() ?? "";
  const hasToken = token.length > 0;

  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(createResetPasswordSchema()),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const handlePasswordSubmit = passwordForm.handleSubmit(async (data) => {
    if (!hasToken) {
      toast.error("Reset token is missing or invalid.");
      return;
    }

    try {
      const response = await resetPasswordMutation.mutateAsync({
        token,
        password: data.password
      });

      toast.success(response.message || "Your password was reset successfully.");
      router.push("/service-provider/login");
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Could not reset password. Please try again.";

      toast.error(message);
    }
  });

  return (
    <section className="container flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/service-provider/login"
          className="inline-flex items-center gap-2 text-sm text-primary"
        >
          <ChevronLeft className="size-4" />
          Back to login
        </Link>

        <div className="w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">FixMinCykel</p>
            <h1 className="text-2xl">Reset your password</h1>
            <p className="text-sm text-muted-foreground">
              {hasToken
                ? "Set a new password for your account."
                : "Missing reset token. Please request a new reset link."}
            </p>
          </div>

          {!hasToken && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              This reset link is invalid or expired. Request a new link from forgot password.
            </p>
          )}

          <Form {...passwordForm}>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-navy"
                disabled={resetPasswordMutation.isPending || !hasToken}
              >
                {resetPasswordMutation.isPending ? "Saving..." : "Save new password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
