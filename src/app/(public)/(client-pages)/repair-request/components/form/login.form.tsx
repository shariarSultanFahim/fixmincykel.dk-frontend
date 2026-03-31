"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { LoginErrorResponse } from "@/types/auth";
import { AUTH_SESSION_COOKIE } from "@/constants/auth";

import { buildSessionFromLoginResponse, useLogin } from "@/lib/actions/auth/login";
import { useRegister } from "@/lib/actions/auth/register";
import {
  buildSessionFromVerifyUserResponse,
  useResendOTP,
  useVerifyUser
} from "@/lib/actions/auth/verify-user";
import { cookie } from "@/lib/cookie-client";

import { useToast } from "@/hooks";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your full name"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().min(1, "Please enter your phone number"),
    address: z.string().trim().min(1, "Please enter your address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit OTP")
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

interface LoginFormProps {
  onLoginSuccess: () => void;
  isLoading?: boolean;
}

export function LoginForm({ onLoginSuccess, isLoading = false }: LoginFormProps) {
  const { toast } = useToast();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const verifyUserMutation = useVerifyUser();
  const resendOTPMutation = useResendOTP();

  const [activeView, setActiveView] = useState<"login" | "signup" | "otp">("login");
  const [otpEmail, setOTPEmail] = useState("");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: ""
    }
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  });

  const handleLoginSubmit = loginForm.handleSubmit(async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      const session = buildSessionFromLoginResponse(response);

      cookie.set(AUTH_SESSION_COOKIE, JSON.stringify(session));

      toast({
        title: "Success",
        description: response.message || "Login successful."
      });

      onLoginSuccess();
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  });

  const handleSignupSubmit = signupForm.handleSubmit(async (values) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password
      });

      if (response.data?.isVerified === false && response.data.email) {
        setOTPEmail(response.data.email);
        setActiveView("otp");

        toast({
          title: "Verify your email",
          description: response.message || "We sent a verification code to your email."
        });

        return;
      }

      setActiveView("login");
      loginForm.setValue("email", values.email);

      toast({
        title: "Success",
        description: response.message || "Account created. Please log in."
      });
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  });

  const handleOTPSubmit = otpForm.handleSubmit(async ({ otp }) => {
    try {
      const response = await verifyUserMutation.mutateAsync({
        email: otpEmail,
        otp: Number(otp)
      });
      const session = buildSessionFromVerifyUserResponse(response);

      cookie.set(AUTH_SESSION_COOKIE, JSON.stringify(session));

      toast({
        title: "Success",
        description: response.message || "Email verified successfully."
      });

      onLoginSuccess();
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Verification failed. Please try again.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  });

  const handleResendOTP = async () => {
    if (!otpEmail) {
      return;
    }

    try {
      await resendOTPMutation.mutateAsync({ email: otpEmail });
      toast({
        title: "OTP sent",
        description: "A new OTP has been sent to your email."
      });
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Failed to resend OTP. Please try again.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-navy">
          {activeView === "otp" ? "Verify your email" : "Continue to submit"}
        </h3>
        <p className="text-sm text-gray-600">
          {activeView === "otp"
            ? `Enter the 6-digit code sent to ${otpEmail}`
            : "Log in or create an account to submit your repair request"}
        </p>
      </div>

      {activeView !== "otp" && (
        <div className="grid grid-cols-2 rounded-lg bg-muted p-1">
          <Button
            type="button"
            variant={activeView === "login" ? "default" : "ghost"}
            onClick={() => setActiveView("login")}
            className="w-full"
          >
            Login
          </Button>
          <Button
            type="button"
            variant={activeView === "signup" ? "default" : "ghost"}
            onClick={() => setActiveView("signup")}
            className="w-full"
          >
            Sign up
          </Button>
        </div>
      )}

      {activeView === "login" && (
        <Form {...loginForm}>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      autoComplete="email"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loginMutation.isPending || isLoading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {loginMutation.isPending ? "Logging in..." : "Log in & Continue"}
            </Button>
          </form>
        </Form>
      )}

      {activeView === "signup" && (
        <Form {...signupForm}>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      autoComplete="name"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      autoComplete="email"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+45 12 34 56 78"
                      autoComplete="tel"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nørrebrogade 45, 2200 København N"
                      autoComplete="street-address"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      {...field}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={registerMutation.isPending || isLoading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {registerMutation.isPending ? "Creating account..." : "Create account & Continue"}
            </Button>
          </form>
        </Form>
      )}

      {activeView === "otp" && (
        <Form {...otpForm}>
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-navy">Verification code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit OTP"
                      inputMode="numeric"
                      maxLength={6}
                      {...field}
                      onChange={(event) => {
                        const numericValue = event.target.value.replace(/\D/g, "").slice(0, 6);
                        field.onChange(numericValue);
                      }}
                      className="border-gray-200 bg-white text-navy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={verifyUserMutation.isPending || isLoading}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {verifyUserMutation.isPending ? "Verifying..." : "Verify OTP & Continue"}
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={handleResendOTP}
              disabled={resendOTPMutation.isPending}
              className="w-full"
            >
              {resendOTPMutation.isPending ? "Sending..." : "Resend OTP"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setActiveView("signup")}
              className="w-full"
            >
              Back to Sign up
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
