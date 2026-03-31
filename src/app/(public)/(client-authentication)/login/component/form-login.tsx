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

import { buildSessionFromLoginResponse, useLogin } from "@/lib/actions/auth/login";
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

import { createLoginSchema, type LoginFormValues } from "./login.schema";

export function FormLogin() {
  const router = useRouter();
  const { t: tLogin } = useCopy("Login");
  const { t: tSchema } = useCopy("LoginSchema");
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(tSchema)),
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
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary">
          <ChevronLeft className="size-4" />
          {tLogin("backToHome")}
        </Link>

        <div className="space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">{tLogin("brand")}</p>
            <h1 className="text-2xl">{tLogin("title")}</h1>
            <p className="text-sm text-muted-foreground">{tLogin("subtitle")}</p>
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tLogin("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tLogin("emailPlaceholder")}
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
                    <FormLabel>{tLogin("passwordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={tLogin("passwordPlaceholder")}
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
                  {tLogin("rememberMe")}
                </label>
                <Link href="/forget-password" className="text-primary hover:underline">
                  {tLogin("forgotPassword")}
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Log In to Dashboard"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground">
            {tLogin("newTo")}{" "}
            <Link href="/register" className="text-primary hover:underline">
              {tLogin("createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
