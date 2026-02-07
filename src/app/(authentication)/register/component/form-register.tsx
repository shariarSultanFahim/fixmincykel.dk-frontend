"use client";

import Link from "next/link";

import { Check, ChevronLeft, Chrome, Facebook } from "lucide-react";
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

import { createRegisterSchema, RegisterFormValues } from "./register.schema";

export function FormRegister() {
  const { t: tRegister } = useCopy("Register");
  const { t: tSchema } = useCopy("RegisterSchema");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(tSchema)),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = form.handleSubmit((data) => {
    toast("", {
      description: <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>,
      duration: 5000
    });
  });

  return (
    <section className="container my-10 flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary">
          <ChevronLeft className="size-4" />
          {tRegister("backToHome")}
        </Link>

        <div className="space-y-6 rounded-2xl border p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">{tRegister("brand")}</p>
            <h1 className="text-2xl">{tRegister("title")}</h1>
            <p className="text-sm text-muted-foreground">{tRegister("subtitle")}</p>
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tRegister("fullNameLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tRegister("fullNamePlaceholder")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tRegister("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={tRegister("emailPlaceholder")} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tRegister("phoneLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={tRegister("phonePlaceholder")} type="text" {...field} />
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
                    <FormLabel>{tRegister("passwordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={tRegister("passwordPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tRegister("confirmPasswordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={tRegister("confirmPasswordPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {tRegister("submit")}
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>{tRegister("orContinue")}</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="gap-2">
              <Chrome className="size-4" />
              {tRegister("google")}
            </Button>
            <Button variant="outline" className="gap-2">
              <Facebook className="size-4" />
              {tRegister("facebook")}
            </Button>
          </div>

          <div className="rounded-2xl bg-muted/60 p-4 text-sm text-navy">
            <p className="mb-3 font-light">{tRegister("nextStepsTitle")}</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="flex size-5 items-center justify-center text-primary">
                  <Check className="size-10" />
                </span>
                <span>{tRegister("nextStepOne")}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="flex size-5 items-center justify-center text-primary">
                  <Check className="size-10" />
                </span>
                <span>{tRegister("nextStepTwo")}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="flex size-5 items-center justify-center text-primary">
                  <Check className="size-10" />
                </span>
                <span>{tRegister("nextStepThree")}</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {tRegister("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {tRegister("loginHere")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
