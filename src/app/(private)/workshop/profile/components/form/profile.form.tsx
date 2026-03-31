"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Camera } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import type { WorkshopProfileFormProps, WorkshopProfileInfo } from "@/types";

import { profileSchema } from "../schema/profile.schema";

export function WorkshopProfileForm({ initialValues, avatarUrl }: WorkshopProfileFormProps) {
  const updateWorkshopProfileMutation = useUpdateWorkshopProfile();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<WorkshopProfileInfo>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...initialValues,
      description: initialValues.description ?? ""
    }
  });

  useEffect(() => {
    form.reset({
      ...initialValues,
      description: initialValues.description ?? ""
    });
  }, [form, initialValues]);

  const workshopInitial = form.watch("workshopName")?.charAt(0)?.toUpperCase() || "W";

  const avatarPreview = useMemo(() => {
    if (!avatarFile) {
      return avatarUrl ?? undefined;
    }

    return URL.createObjectURL(avatarFile);
  }, [avatarFile, avatarUrl]);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarFile) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarFile, avatarPreview]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!initialValues.workshopId) {
      return;
    }

    try {
      const response = await updateWorkshopProfileMutation.mutateAsync({
        workshopId: initialValues.workshopId,
        data: {
          workshopName: values.workshopName,
          description: values.description,
          address: values.address
        },
        image: avatarFile
      });

      toast.success(response.message || "Workshop profile saved.");
      setAvatarFile(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update workshop profile.";
      toast.error(message);
    }
  });

  return (
    <Card className="rounded-3xl border-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-navy">Workshop Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-muted/30 p-4">
              <Avatar className="h-28 w-28 rounded-full">
                <AvatarImage
                  src={avatarPreview}
                  alt={form.getValues("workshopName") || "Workshop"}
                />
                <AvatarFallback className="bg-muted text-4xl text-primary">
                  {workshopInitial}
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
            </div>

            <FormField
              control={form.control}
              name="workshopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workshop Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                      placeholder="Workshop name"
                      {...field}
                    />
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
                    <Input
                      className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                      placeholder="Street, city"
                      {...field}
                    />
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
                    <Input
                      className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                      inputMode="numeric"
                      placeholder="12345678"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (500 characters)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-28 border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                      maxLength={500}
                      placeholder="Tell customers about your workshop..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">Max 500 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6"
                disabled={updateWorkshopProfileMutation.isPending}
              >
                {updateWorkshopProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
