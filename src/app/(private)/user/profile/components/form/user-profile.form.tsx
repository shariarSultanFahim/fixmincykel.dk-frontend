"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { BikeType } from "@/types/job-create";

import {
  useCreateBike,
  useGetMyBikes,
  useGetMyProfile,
  useUpdateBike,
  useUpdateMyProfile
} from "@/lib/actions/users/profile.user";

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
import type { UserBikeFormValues, UserProfileFormValues } from "@/types";

import { BikeCard } from "../bike-card";
import { AddBikeDialog } from "../dialog";
import { userProfileSchema } from "../schema";
import { UserProfileSkeleton } from "../skeleton";

const EMPTY_FORM_VALUES: UserProfileFormValues = {
  fullName: "",
  email: "",
  phone: "",
  address: ""
};

// const DEFAULT_PREFERENCE_VALUES: UserPreferencesFormValues = {
//   emailNotifications: true,
//   smsNotifications: true,
//   marketingEmails: false
// };

const normalizeBikeType = (type: string): BikeType => type.trim().toUpperCase() as BikeType;

export function UserProfileForm() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: userResponse, isLoading: isUserLoading } = useGetMyProfile();
  const { data: bikesResponse, isLoading: isBikeLoading } = useGetMyBikes();
  const updateProfileMutation = useUpdateMyProfile();
  const createBikeMutation = useCreateBike();
  const updateBikeMutation = useUpdateBike();

  const user = userResponse?.data;
  const bikes = bikesResponse?.data ?? [];
  const isLoading = isUserLoading || isBikeLoading;
  const fullNameInitial = user?.name?.charAt(0) ?? "U";

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: EMPTY_FORM_VALUES
  });

  // const preferencesForm = useForm<UserPreferencesFormValues>({
  //   resolver: zodResolver(userPreferencesSchema),
  //   defaultValues: DEFAULT_PREFERENCE_VALUES
  // });

  useEffect(() => {
    if (!user) {
      return;
    }

    form.reset({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address ?? ""
    });
  }, [form, user]);

  const avatarPreview = useMemo(() => {
    if (!avatarFile) {
      return user?.avatar ?? undefined;
    }

    return URL.createObjectURL(avatarFile);
  }, [avatarFile, user?.avatar]);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarFile) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarFile, avatarPreview]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!user) {
      return;
    }

    try {
      const response = await updateProfileMutation.mutateAsync({
        userId: user.id,
        data: {
          name: values.fullName,
          address: values.address
        },
        image: avatarFile
      });

      toast.success(response.message || "Profile updated.");
      setAvatarFile(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile.";
      toast.error(message);
    }
  });

  const onCreateBike = async (values: UserBikeFormValues & { ownerId: string }) => {
    await createBikeMutation.mutateAsync({
      ownerId: values.ownerId,
      name: values.name,
      type: normalizeBikeType(values.type),
      brand: values.brand,
      model: values.model,
      year: Number(values.year),
      color: values.color,
      isPrimary: values.isPrimary
    });
  };

  const onUpdateBike = async (bikeId: string, values: UserBikeFormValues) => {
    await updateBikeMutation.mutateAsync({
      bikeId,
      data: {
        ownerId: user?.id,
        name: values.name,
        type: normalizeBikeType(values.type),
        brand: values.brand,
        model: values.model,
        year: Number(values.year),
        color: values.color,
        isPrimary: values.isPrimary
      }
    });
  };

  // const onPreferenceSubmit = preferencesForm.handleSubmit(() => {
  //   toast.info("Preferences API is not ready yet.");
  // });

  const primaryBike = bikes.find((bike) => bike.isPrimary);
  const secondaryBikes = bikes.filter((bike) => !bike.isPrimary);
  const hasPrimaryBike = Boolean(primaryBike);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (!user) {
    return (
      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent>
          <p className="text-sm text-muted-foreground">Unable to load profile data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 rounded-full">
                <AvatarImage src={avatarPreview} />
                <AvatarFallback className="bg-muted text-5xl text-primary">
                  {form.getValues("fullName").charAt(0) || fullNameInitial}
                </AvatarFallback>
              </Avatar>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setAvatarFile(file);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 border-dashed"
                onClick={() => inputRef.current?.click()}
              >
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
                        <InputGroupInput placeholder="user@example.com" disabled {...field} />
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
                        <InputGroupInput placeholder="+45 12 34 56 78" disabled {...field} />
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
            <AddBikeDialog
              ownerId={user.id}
              hasPrimaryBike={hasPrimaryBike}
              onSubmit={onCreateBike}
            />
          </CardHeader>
          <CardContent className="space-y-4">
            {primaryBike && (
              <BikeCard
                bike={primaryBike}
                variant="primary"
                hasPrimaryBike={hasPrimaryBike}
                onEditBike={onUpdateBike}
              />
            )}
            {secondaryBikes.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                variant="secondary"
                hasPrimaryBike={hasPrimaryBike}
                onEditBike={onUpdateBike}
              />
            ))}
            {bikes.length === 0 && (
              <p className="text-sm text-muted-foreground">No bikes added yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        {/* <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-navy">Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...preferencesForm}>
              <div className="space-y-4">
                <div className="space-y-3">
                  <PreferenceToggle
                    control={preferencesForm.control}
                    name="emailNotifications"
                    label="Email Notifications"
                    description="Receive updates about your repairs"
                  />
                  <PreferenceToggle
                    control={preferencesForm.control}
                    name="smsNotifications"
                    label="SMS Notifications"
                    description="Get text reminders for appointments"
                  />
                  <PreferenceToggle
                    control={preferencesForm.control}
                    name="marketingEmails"
                    label="Marketing Emails"
                    description="Receive tips and special offers"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6"
                    onClick={onPreferenceSubmit}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card> */}

        <div className="flex justify-end">
          <Button type="submit" className="px-6" disabled={updateProfileMutation.isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
