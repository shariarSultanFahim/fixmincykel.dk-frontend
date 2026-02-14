"use client";

import Link from "next/link";

import { Check, ChevronLeft, Clock, Headset, LayoutDashboard, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema()),
    defaultValues: {
      workshopName: "",
      cvrNumber: "",
      address: "",
      city: "",
      postalCode: "",
      email: "",
      phone: "",
      ownerName: "",
      password: ""
    }
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
        <Link href="/service-provider" className="inline-flex items-center gap-2 text-sm text-navy">
          <ChevronLeft className="size-4" />
          Back to Home
        </Link>

        <div className="space-y-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-subtle">
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-navy">FixMinCykel.dk</p>
            <h1 className="text-2xl">Workshop Sign Up / Apply</h1>
            <p className="text-sm text-muted-foreground">Apply to Become a Partner</p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-navy">
            <p className="mb-3 font-semibold">Requirements:</p>
            <ul className="space-y-2 text-navy/80">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span>CVR Verified</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span>Physical Location</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span>Repair Experience</span>
              </li>
            </ul>
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="workshopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workshop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workshop name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvrNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVR Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Danish CVR" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Code" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business email" type="email" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workshop phone" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" type="text" {...field} />
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
                      <Input type="password" placeholder="Create secure password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-navy">
                Submit Application
              </Button>
            </form>
          </Form>

          <div className="rounded-2xl bg-muted/40 p-4 text-sm text-navy">
            <p className="mb-3 font-semibold">Process After Applying:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-navy/70">
                <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Review (1-2 days)</p>
                  <p className="text-xs text-navy/60">Our team will verify your information</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-navy/70">
                <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Approval Email</p>
                  <p className="text-xs text-navy/60">You&apos;ll receive confirmation via email</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-navy/70">
                <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LayoutDashboard className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Dashboard Access</p>
                  <p className="text-xs text-navy/60">Login credentials will be sent</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-navy/70">
                <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Headset className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Onboarding Support</p>
                  <p className="text-xs text-navy/60">We&apos;ll help you get started</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Already applied?</span>
            <Link href="/service-provider/application-status" className="text-navy hover:underline">
              Check status
            </Link>
            <span>•</span>
            <span>Existing partner?</span>
            <Link href="/service-provider/login" className="text-navy hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
