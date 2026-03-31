"use client";

import { FormEvent, useState } from "react";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { useSubscribeNewsletter } from "@/lib/actions/newsletter/subscribe-newsletter";

import { Button, Input } from "@/components/ui";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const subscribeNewsletterMutation = useSubscribeNewsletter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await subscribeNewsletterMutation.mutateAsync({
        email: normalizedEmail
      });

      toast.success(response.message || "Subscribed to newsletter successfully");
      setEmail("");
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.";

      toast.error(message);
    }
  };

  return (
    <section className="container py-10">
      <div className="container flex w-full flex-col items-center justify-center rounded-[14px] bg-[url('/newslatter-bg.png')] bg-cover bg-center bg-no-repeat py-20">
        <h1 className="text-center text-3xl font-bold text-navy md:text-4xl">
          Subscribe to our Newsletter
        </h1>
        <p className="mt-2 text-center text-base text-navy/90">
          Get the latest maintenance tips and local deals.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-md flex-col items-center gap-2"
        >
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            disabled={subscribeNewsletterMutation.isPending}
            className="h-11 w-full border-navy/20 bg-white"
          />
          <Button
            type="submit"
            disabled={subscribeNewsletterMutation.isPending}
            className="rounded-md bg-navy px-8 py-2 text-white hover:bg-navy/90"
          >
            {subscribeNewsletterMutation.isPending ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </section>
  );
}
