"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useGetCategories } from "@/lib/actions/jobs/get.categories";
import {
  useAddWorkshopCategory,
  useCreateWorkshopOpeningHour,
  useGetWorkshopCategories,
  useGetWorkshopOpeningHours,
  useRemoveWorkshopCategory,
  useUpdateWorkshopOpeningHour
} from "@/lib/actions/workshops/profile.workshop";
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
  Label
} from "@/components/ui";
import type {
  WorkshopOpeningHourFormValue,
  WorkshopServiceFormProps,
  WorkshopServiceSettings,
  WorkshopWeekDay
} from "@/types";

import { serviceSchema } from "../schema/service.schema";

const WORKSHOP_DAYS: WorkshopWeekDay[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];

const DAY_LABELS: Record<WorkshopWeekDay, string> = {
  SUNDAY: "Sunday",
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday"
};

const DEFAULT_OPEN_TIME = "09:00";
const DEFAULT_CLOSE_TIME = "18:00";

const buildDefaultOpeningHours = (): WorkshopOpeningHourFormValue[] =>
  WORKSHOP_DAYS.map((day) => ({
    day,
    openTime: DEFAULT_OPEN_TIME,
    closeTime: DEFAULT_CLOSE_TIME,
    isClosed: false
  }));

export function WorkshopServiceForm({ initialValues, workshopId }: WorkshopServiceFormProps) {
  const form = useForm<WorkshopServiceSettings>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialValues
  });

  const { data: allCategoriesResponse, isLoading: isAllCategoriesLoading } = useGetCategories(
    1,
    500,
    "name",
    Boolean(workshopId)
  );
  const { data: workshopCategoriesResponse, isLoading: isWorkshopCategoriesLoading } =
    useGetWorkshopCategories(Boolean(workshopId));
  const { data: workshopOpeningHoursResponse, isLoading: isWorkshopOpeningHoursLoading } =
    useGetWorkshopOpeningHours(workshopId, Boolean(workshopId));
  const addWorkshopCategoryMutation = useAddWorkshopCategory();
  const removeWorkshopCategoryMutation = useRemoveWorkshopCategory();
  const createWorkshopOpeningHourMutation = useCreateWorkshopOpeningHour();
  const updateWorkshopOpeningHourMutation = useUpdateWorkshopOpeningHour();

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  useEffect(() => {
    const workshopCategoryNames =
      workshopCategoriesResponse?.data?.map((item) => item.category.name) ?? [];

    form.setValue("serviceCategories", workshopCategoryNames, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false
    });
  }, [form, workshopCategoriesResponse?.data]);

  useEffect(() => {
    const openingHoursByDay = new Map(
      (workshopOpeningHoursResponse?.data ?? []).map((item) => [item.day, item])
    );

    const mergedOpeningHours = WORKSHOP_DAYS.map((day) => {
      const currentDay = openingHoursByDay.get(day);

      return {
        day,
        openTime: currentDay?.openTime?.slice(0, 5) ?? DEFAULT_OPEN_TIME,
        closeTime: currentDay?.closeTime?.slice(0, 5) ?? DEFAULT_CLOSE_TIME,
        isClosed: currentDay?.isClosed ?? false
      };
    });

    form.setValue("openingHours", mergedOpeningHours, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false
    });
  }, [form, workshopOpeningHoursResponse?.data]);

  const openingHourIdByDay = useMemo(
    () =>
      new Map(
        (workshopOpeningHoursResponse?.data ?? []).map((item) => [item.day, item.id] as const)
      ),
    [workshopOpeningHoursResponse?.data]
  );

  const onSubmit = form.handleSubmit(async (values) => {
    if (!workshopId) {
      toast.error("Workshop ID is missing.");
      return;
    }

    try {
      await Promise.all(
        values.openingHours.map(async (openingHour) => {
          const payload = {
            openTime: openingHour.openTime,
            closeTime: openingHour.closeTime,
            isClosed: openingHour.isClosed
          };

          const openingHourId = openingHourIdByDay.get(openingHour.day);

          if (openingHourId) {
            await updateWorkshopOpeningHourMutation.mutateAsync({
              openingHourId,
              data: payload
            });
            return;
          }

          await createWorkshopOpeningHourMutation.mutateAsync({
            workshopId,
            day: openingHour.day,
            ...payload
          });
        })
      );

      toast.success("Service settings saved.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save opening hours.";
      toast.error(message);
    }
  });

  const availableCategories = allCategoriesResponse?.data?.data ?? [];
  const workshopCategories = workshopCategoriesResponse?.data ?? [];
  const openingHours =
    useWatch({
      control: form.control,
      name: "openingHours"
    }) ?? buildDefaultOpeningHours();

  const handleCategoryToggle = async (categoryId: string, isSelected: boolean) => {
    if (!workshopId) {
      return;
    }

    try {
      if (isSelected) {
        const workshopCategory = workshopCategories.find((item) => item.categoryId === categoryId);

        if (!workshopCategory) {
          return;
        }

        const response = await removeWorkshopCategoryMutation.mutateAsync(workshopCategory.id);
        toast.success(response.message || "Category removed from workshop.");
        return;
      }

      const response = await addWorkshopCategoryMutation.mutateAsync({
        workshopId,
        categoryId
      });
      toast.success(response.message || "Category added to workshop.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update workshop category.";
      toast.error(message);
    }
  };

  const isCategoryActionPending =
    addWorkshopCategoryMutation.isPending || removeWorkshopCategoryMutation.isPending;
  const isOpeningHourActionPending =
    createWorkshopOpeningHourMutation.isPending || updateWorkshopOpeningHourMutation.isPending;

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
                        {isAllCategoriesLoading || isWorkshopCategoriesLoading ? (
                          <p className="text-sm text-muted-foreground">Loading categories...</p>
                        ) : availableCategories.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No categories available.</p>
                        ) : (
                          availableCategories.map((category) => {
                            const isSelected = selectedCategories.includes(category.name);

                            return (
                              <Button
                                key={category.id}
                                type="button"
                                size="sm"
                                variant={isSelected ? "default" : "outline"}
                                className={cn(
                                  "rounded-full px-4 text-xs",
                                  isSelected && "shadow-sm"
                                )}
                                disabled={isCategoryActionPending || !workshopId}
                                onClick={async () => {
                                  const nextValue = isSelected
                                    ? selectedCategories.filter((item) => item !== category.name)
                                    : [...selectedCategories, category.name];

                                  field.onChange(nextValue);
                                  await handleCategoryToggle(category.id, isSelected);
                                }}
                              >
                                {category.name}
                              </Button>
                            );
                          })
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-navy">Opening Hours</Label>
              <div className="space-y-3">
                {isWorkshopOpeningHoursLoading ? (
                  <p className="text-sm text-muted-foreground">Loading opening hours...</p>
                ) : (
                  openingHours.map((openingHour, index) => (
                    <div
                      key={openingHour.day}
                      className="grid gap-3 rounded-2xl border border-border p-3 md:grid-cols-[140px_1fr_1fr_auto] md:items-end"
                    >
                      <div className="space-y-1 md:pb-4">
                        <p className="text-sm font-semibold">{DAY_LABELS[openingHour.day]}</p>
                      </div>

                      <FormField
                        control={form.control}
                        name={`openingHours.${index}.openTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-muted-foreground">
                              Open
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                                disabled={openingHour.isClosed}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`openingHours.${index}.closeTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-muted-foreground">
                              Close
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="border border-border focus-visible:ring-primary/50 data-[state=invalid]:border-destructive"
                                disabled={openingHour.isClosed}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`openingHours.${index}.isClosed`}
                        render={({ field }) => (
                          <FormItem className="flex h-10 items-center gap-2">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="size-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary"
                                checked={field.value}
                                onChange={(event) => field.onChange(event.target.checked)}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-medium text-muted-foreground">
                              Off day
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <CardFooter className="justify-end px-0">
              <Button type="submit" className="px-6" disabled={isOpeningHourActionPending}>
                {isOpeningHourActionPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
