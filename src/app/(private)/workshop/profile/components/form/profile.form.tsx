"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const form = useForm<WorkshopProfileInfo>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...initialValues,
      description: initialValues.description ?? ""
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Workshop profile", values);
    toast.success("Workshop profile saved.");
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
              <Button type="submit" className="px-6">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
