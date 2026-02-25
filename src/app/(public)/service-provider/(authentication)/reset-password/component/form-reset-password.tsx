"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  createResetEmailSchema,
  createResetOtpSchema,
  createResetPasswordSchema,
  type ResetEmailFormValues,
  type ResetOtpFormValues,
  type ResetPasswordFormValues
} from "./reset-password.schema";

type ResetStep = "email" | "otp" | "password";

const OTP_EXPIRY_SECONDS = 5 * 60;

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function FormResetPassword() {
  const [step, setStep] = useState<ResetStep>("email");
  const [emailValue, setEmailValue] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState<Date | null>(null);
  const [otpSecondsLeft, setOtpSecondsLeft] = useState(OTP_EXPIRY_SECONDS);

  const emailForm = useForm<ResetEmailFormValues>({
    resolver: zodResolver(createResetEmailSchema()),
    defaultValues: { email: "" }
  });

  const otpForm = useForm<ResetOtpFormValues>({
    resolver: zodResolver(createResetOtpSchema()),
    defaultValues: { otp: "" }
  });

  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(createResetPasswordSchema()),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const otpCountdownLabel = useMemo(
    () => `Code expires in ${formatSeconds(otpSecondsLeft)}`,
    [otpSecondsLeft]
  );

  const startOtpTimer = useCallback(() => {
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);
    setOtpExpiresAt(expiresAt);
    setOtpSecondsLeft(OTP_EXPIRY_SECONDS);
  }, []);

  useEffect(() => {
    if (step !== "otp" || !otpExpiresAt) {
      return;
    }

    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((otpExpiresAt.getTime() - Date.now()) / 1000));
      setOtpSecondsLeft(remaining);
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, [otpExpiresAt, step]);

  const handleEmailSubmit = emailForm.handleSubmit((data) => {
    console.log("Reset password email:", data);
    setEmailValue(data.email);
    setVerifiedOtp("");
    otpForm.reset({ otp: "" });
    startOtpTimer();
    setStep("otp");
  });

  const handleOtpSubmit = otpForm.handleSubmit((data) => {
    if (otpSecondsLeft <= 0) {
      otpForm.setError("otp", {
        type: "manual",
        message: "The code has expired. Please request a new one."
      });
      return;
    }

    console.log("Reset password OTP:", data);
    setVerifiedOtp(data.otp);
    setStep("password");
  });

  const handlePasswordSubmit = passwordForm.handleSubmit((data) => {
    console.log("Reset password payload:", {
      email: emailValue,
      otp: verifiedOtp,
      password: data.password,
      confirmPassword: data.confirmPassword
    });
  });

  const handleResendOtp = () => {
    console.log("Resend OTP to:", emailValue);
    otpForm.reset({ otp: "" });
    startOtpTimer();
  };

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
              {step === "email" && "Enter your email to get a reset code."}
              {step === "otp" && "Enter the 6-digit code sent to your email."}
              {step === "password" && "Set a new password for your account."}
            </p>
          </div>

          <div className="space-y-6">
            {step === "email" && (
              <Form {...emailForm}>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <FormField
                    control={emailForm.control}
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

                  <Button type="submit" className="w-full bg-navy">
                    Send code
                  </Button>
                </form>
              </Form>
            )}

            {step === "otp" && (
              <Form {...otpForm}>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP code</FormLabel>
                        <FormControl>
                          <Input
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="000000"
                            maxLength={6}
                            className="text-center tracking-[0.4em]"
                            {...field}
                            onChange={(event) => {
                              const nextValue = event.target.value.replace(/\D/g, "");
                              field.onChange(nextValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span>OTP is valid for 5 mins.</span>
                    <span>{otpCountdownLabel}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full bg-navy">
                      Verify code
                    </Button>
                    <Button type="button" variant="outline" onClick={handleResendOtp}>
                      Send again
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === "password" && (
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

                  <Button type="submit" className="w-full bg-navy">
                    Save new password
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
