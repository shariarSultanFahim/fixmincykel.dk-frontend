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
  buildSessionFromVerifyWorkshopResponse,
  useResendWorkshopOTP,
  useVerifyWorkshop
} from "@/lib/actions/auth/verify-workshop";
import { cookie } from "@/lib/cookie-client";

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
  const email = searchParams.get("email") ?? "";

  const verifyMutation = useVerifyWorkshop();
  const resendMutation = useResendWorkshopOTP();

  const form = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(createVerifyOTPSchema()),
    defaultValues: { email, otp: "" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await verifyMutation.mutateAsync({
        email: values.email,
        otp: parseInt(values.otp, 10)
      });

      const approvalStatus = response.data?.workshop?.approvalStatus?.toUpperCase();
      if (approvalStatus === "PENDING") {
        toast.info("Your workshop is waiting for approval. Please check back in a day.");
        router.replace("/service-provider/login");
        return;
      }

      const session = buildSessionFromVerifyWorkshopResponse(response);
      cookie.set(AUTH_SESSION_COOKIE, JSON.stringify(session));

      toast.success(response.message || "Workshop verified successfully.");
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
        <Link href="/service-provider" className="inline-flex items-center gap-2 text-sm text-navy">
          <ChevronLeft className="size-4" />
          Back to home
        </Link>

        <div className="space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">FixMinCykel.dk</p>
            <h1 className="text-2xl">Verify Workshop Account</h1>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your email
            </p>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={(event) => {
                          const numericOnly = event.target.value.replace(/\D/g, "");
                          field.onChange(numericOnly);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-navy" disabled={verifyMutation.isPending}>
                {verifyMutation.isPending ? "Verifying..." : "Verify and Continue"}
              </Button>
            </form>
          </Form>

          <div className="flex flex-col items-center gap-3 text-sm">
            <span className="text-muted-foreground">Didn&apos;t receive the code?</span>
            <Button
              type="button"
              variant="link"
              onClick={onResendOTP}
              disabled={resendMutation.isPending}
              className="h-auto p-0 text-navy"
            >
              {resendMutation.isPending ? "Sending..." : "Resend code"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
