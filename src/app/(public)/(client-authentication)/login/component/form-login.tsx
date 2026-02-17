"use client";

import Link from "next/link";

import { ChevronLeft, Chrome, Facebook } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const { t: tLogin } = useCopy("Login");
  const { t: tSchema } = useCopy("LoginSchema");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(tSchema)),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = form.handleSubmit((data) => {
    toast("", {
      description: <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>,
      duration: 5000
    });
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
                <Link href="/forgot-password" className="text-primary hover:underline">
                  {tLogin("forgotPassword")}
                </Link>
              </div>

              <Button type="submit" className="w-full">
                {tLogin("submit")}
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>{tLogin("orContinue")}</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="gap-2">
              <Chrome className="size-4" />
              {tLogin("google")}
            </Button>
            <Button variant="outline" className="gap-2">
              <Facebook className="size-4" />
              {tLogin("facebook")}
            </Button>
          </div>

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
