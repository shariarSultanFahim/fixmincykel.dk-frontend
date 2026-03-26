"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import type { WorkshopProfileFormProps, WorkshopProfileInfo } from "@/types";

import { profileSchema } from "../schema/profile.schema";

export function WorkshopProfileForm({ initialValues }: WorkshopProfileFormProps) {
  const updateWorkshopProfileMutation = useUpdateWorkshopProfile();

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
        }
      });

      toast.success(response.message || "Workshop profile saved.");
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
            <CardFooter className="justify-end px-0">
              <Button
                type="submit"
                className="px-6"
                disabled={updateWorkshopProfileMutation.isPending}
              >
                {updateWorkshopProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
