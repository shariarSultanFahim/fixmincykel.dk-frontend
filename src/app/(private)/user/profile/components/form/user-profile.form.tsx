"use client";

import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { UserProfileFormProps, UserProfileFormValues } from "@/types";

import { BikeCard } from "../bike-card";
import { AddBikeDialog } from "../dialog";
import { PreferenceToggle } from "../preference-toggle";
import { userProfileSchema } from "../schema";

export function UserProfileForm({ initialValues }: UserProfileFormProps) {
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: initialValues.fullName,
      email: initialValues.email,
      phone: initialValues.phone,
      address: initialValues.address,
      preferences: initialValues.preferences
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("User profile", values);
    toast.success("Profile updated.");
  });
  const primaryBike = initialValues.bikes.find((bike) => bike.isPrimary);
  const secondaryBikes = initialValues.bikes.filter((bike) => !bike.isPrimary);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 rounded-full">
                <AvatarImage src={initialValues.avatarUrl} />
                <AvatarFallback className="bg-muted text-5xl text-primary">
                  {initialValues.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm" className="gap-2 border-dashed">
                <Camera className="size-4" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <InputGroup className="bg-muted/60">
                        <InputGroupAddon>
                          <User className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="User Name" {...field} />
                      </InputGroup>
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <InputGroup className="bg-muted/60">
                        <InputGroupAddon>
                          <Mail className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="user@example.com" {...field} />
                      </InputGroup>
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <InputGroup className="bg-muted/60">
                        <InputGroupAddon>
                          <Phone className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="+45 12 34 56 78" {...field} />
                      </InputGroup>
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
                      <InputGroup className="bg-muted/60">
                        <InputGroupAddon>
                          <MapPin className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Street address, city" {...field} />
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-navy">My Bikes</CardTitle>
            <AddBikeDialog />
          </CardHeader>
          <CardContent className="space-y-4">
            {primaryBike && <BikeCard bike={primaryBike} variant="primary" />}
            {secondaryBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} variant="secondary" />
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-navy">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <PreferenceToggle
              control={form.control}
              name="preferences.emailNotifications"
              label="Email Notifications"
              description="Receive updates about your repairs"
            />
            <PreferenceToggle
              control={form.control}
              name="preferences.smsNotifications"
              label="SMS Notifications"
              description="Get text reminders for appointments"
            />
            <PreferenceToggle
              control={form.control}
              name="preferences.marketingEmails"
              label="Marketing Emails"
              description="Receive tips and special offers"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="px-6">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
