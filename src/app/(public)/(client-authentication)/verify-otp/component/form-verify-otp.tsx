"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { LoginErrorResponse } from "@/types/auth";
import { AUTH_SESSION_COOKIE, ROLE_HOME_PATHS } from "@/constants/auth";

import {
  buildSessionFromVerifyUserResponse,
  useResendOTP,
  useVerifyUser
} from "@/lib/actions/auth/verify-user";
import { cookie } from "@/lib/cookie-client";

import { useCopy } from "@/hooks";

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

import { createVerifyOTPSchema, type VerifyOTPFormValues } from "./verify-otp.schema";

export function FormVerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { t: tVerify } = useCopy("VerifyOTP");
  const { t: tSchema } = useCopy("VerifyOTPSchema");
  const verifyMutation = useVerifyUser();
  const resendMutation = useResendOTP();

  const form = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(createVerifyOTPSchema(tSchema)),
    defaultValues: { email, otp: undefined }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await verifyMutation.mutateAsync({
        email: values.email,
        otp: values.otp
      });
      const session = buildSessionFromVerifyUserResponse(response);

      cookie.set(AUTH_SESSION_COOKIE, JSON.stringify(session));

      toast.success(response.message || "Email verified successfully.");
      router.replace(ROLE_HOME_PATHS[session.role]);
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Verification failed. Please try again.";

      toast.error(message);
    }
  });

  const onResendOTP = async () => {
    try {
      await resendMutation.mutateAsync({ email });
      toast.success("Verification code sent to your email.");
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again.";

      toast.error(message);
    }
  };

  return (
    <section className="container my-10 flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary">
          <ChevronLeft className="size-4" />
          {tVerify("backToHome")}
        </Link>

        <div className="space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">{tVerify("brand")}</p>
            <h1 className="text-2xl">{tVerify("title")}</h1>
            <p className="text-sm text-muted-foreground">{tVerify("subtitle")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tVerify("otpLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tVerify("otpPlaceholder")}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value ? parseInt(value, 10) : undefined);
                        }}
                        value={field.value ? String(field.value).padStart(6, "") : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={verifyMutation.isPending}>
                {tVerify("submit")}
              </Button>
            </form>
          </Form>

          <div className="flex flex-col items-center gap-3 text-sm">
            <span className="text-muted-foreground">{tVerify("resendHint")}</span>
            <Button
              type="button"
              variant="link"
              onClick={onResendOTP}
              disabled={resendMutation.isPending}
              className="h-auto p-0"
            >
              {tVerify("resendOTP")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
