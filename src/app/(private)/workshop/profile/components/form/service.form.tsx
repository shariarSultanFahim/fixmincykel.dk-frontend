"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Separator
} from "@/components/ui";
import type { WorkshopServiceFormProps, WorkshopServiceSettings } from "@/types";

import { serviceSchema } from "../schema/service.schema";

const SERVICE_CATEGORIES = ["Puncture", "Brakes", "Chain", "Gears", "Electric", "Full Service"];

export function WorkshopServiceForm({ initialValues }: WorkshopServiceFormProps) {
  const form = useForm<WorkshopServiceSettings>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialValues
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Workshop service settings", values);
    toast.success("Service settings saved.");
  });

  return (
    <Card className="rounded-3xl border-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-navy">Service Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceCategories"
              render={({ field }) => {
                const selectedCategories = field.value ?? [];

                return (
                  <FormItem>
                    <FormLabel>Service Categories</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_CATEGORIES.map((category) => {
                          const isSelected = selectedCategories.includes(category);

                          return (
                            <Button
                              key={category}
                              type="button"
                              size="sm"
                              variant={isSelected ? "default" : "outline"}
                              className={cn("rounded-full px-4 text-xs", isSelected && "shadow-sm")}
                              onClick={() => {
                                const nextValue = isSelected
                                  ? selectedCategories.filter((item) => item !== category)
                                  : [...selectedCategories, category];

                                field.onChange(nextValue);
                              }}
                            >
                              {category}
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-navy">Opening Hours</Label>
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="openingHours.weekdaysStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground">
                          Monday - Friday
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="openingHours.weekdaysEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground">
                          Closing
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="openingHours.saturdayStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground">
                          Saturday
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="openingHours.saturdayEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground">
                          Closing
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-navy">Notification Settings</Label>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <FormField
                  control={form.control}
                  name="notifications.email"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="size-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary"
                          checked={field.value}
                          onChange={(event) => field.onChange(event.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground">
                        Email alerts for new jobs/messages
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notifications.sms"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="size-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary"
                          checked={field.value}
                          onChange={(event) => field.onChange(event.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground">
                        SMS for urgent jobs (optional)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notifications.inApp"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="size-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary"
                          checked={field.value}
                          onChange={(event) => field.onChange(event.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground">
                        In-app notifications
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
