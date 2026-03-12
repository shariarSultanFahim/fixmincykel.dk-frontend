"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { LoginErrorResponse } from "@/types/auth";
import { AUTH_SESSION_COOKIE, ROLE_HOME_PATHS } from "@/constants/auth";

import {
  buildSessionFromLoginResponse,
  useLogin as useWorkshopLogin
} from "@/lib/actions/auth/login.workshop";
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

import { createLoginSchema, type LoginFormValues } from "./login.schema";

export function FormLogin() {
  const router = useRouter();
  const loginMutation = useWorkshopLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema()),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      const session = buildSessionFromLoginResponse(response);

      cookie.set(AUTH_SESSION_COOKIE, JSON.stringify(session));

      toast.success(response.message || "Login successful.");
      router.replace(ROLE_HOME_PATHS[session.role]);
    } catch (error) {
      const message = isAxiosError<LoginErrorResponse>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      toast.error(message);
    }
  });

  return (
    <section className="container flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/service-provider" className="inline-flex items-center gap-2 text-sm text-navy">
          <ChevronLeft className="size-4" />
          Back to home
        </Link>

        <div className="space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">FixMinCykel.dk</p>
            <h1 className="text-2xl">Workshop Login</h1>
            <p className="text-sm text-muted-foreground">Workshop Partner Login</p>
          </div>
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
                        placeholder="Enter workshop email"
                        autoComplete="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="size-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary"
                  />
                  Remember me
                </label>
                <Link
                  href="/service-provider/forget-password"
                  className="text-navy hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-navy" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Log In to Dashboard"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground">
            Not a partner yet?{" "}
            <Link href="/service-provider/register" className="text-navy hover:underline">
              Apply to join
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
