"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetPlatformCategories, useGetPlatformData } from "@/lib/actions/settings/get.settings";
import {
  useCreatePlatformCategory,
  useDeletePlatformCategory,
  useUpdatePlatformData
} from "@/lib/actions/settings/manage.settings";
import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "@/components/ui/input-group";

import { settingsSchema, type SettingsFormValues } from "../schemas/settings-schema";

const SETTINGS_DEFAULTS: SettingsFormValues = {
  platformFeePercentage: 0,
  maxJobRadius: 1,
  newCategory: ""
};

export default function SettingsForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const maxCategoryLength = 20;
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: SETTINGS_DEFAULTS
  });

  const { data: platformDataResponse, isFetching: isPlatformDataFetching } = useGetPlatformData();
  const { data: categoriesResponse, isFetching: isCategoriesFetching } = useGetPlatformCategories();
  const { mutate: createCategory, isPending: isCreatingCategory } = useCreatePlatformCategory();
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useDeletePlatformCategory();
  const { mutate: updatePlatformData, isPending: isSavingSettings } = useUpdatePlatformData();

  const categories = useMemo(
    () => categoriesResponse?.data?.data ?? [],
    [categoriesResponse?.data?.data]
  );

  useEffect(() => {
    const platformData = platformDataResponse?.data;
    if (!platformData) {
      return;
    }

    form.reset({
      platformFeePercentage: platformData.platformFee,
      maxJobRadius: platformData.maximumJobRadius,
      newCategory: ""
    });
  }, [form, platformDataResponse?.data]);

  const handleAddCategory = useCallback(() => {
    const newCategory = form.getValues("newCategory")?.trim();

    if (!newCategory) {
      return;
    }

    if (newCategory.length > maxCategoryLength) {
      form.setError("newCategory", {
        type: "manual",
        message: `Category name must be ${maxCategoryLength} characters or less`
      });
      return;
    }

    const exists = categories.some(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (exists) {
      form.setValue("newCategory", "");
      return;
    }

    createCategory(
      { name: newCategory },
      {
        onSuccess: (result) => {
          toast({ title: result.message });
          queryClient.invalidateQueries({ queryKey: ["platform-categories"] });
          form.setValue("newCategory", "");
          form.clearErrors("newCategory");
        },
        onError: () => {
          toast({
            title: "Failed to add category",
            description: "Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  }, [categories, createCategory, form, maxCategoryLength, queryClient, toast]);

  const handleRemoveCategory = (categoryId: string) => {
    deleteCategory(categoryId, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["platform-categories"] });
      },
      onError: () => {
        toast({
          title: "Failed to delete category",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const handleSubmit = (values: SettingsFormValues) => {
    updatePlatformData(
      {
        platformFee: values.platformFeePercentage,
        maximumJobRadius: values.maxJobRadius
      },
      {
        onSuccess: (result) => {
          toast({ title: result.message });
          queryClient.invalidateQueries({ queryKey: ["platform-data"] });
          form.reset({
            platformFeePercentage: result.data.platformFee,
            maxJobRadius: result.data.maximumJobRadius,
            newCategory: ""
          });
        },
        onError: () => {
          toast({
            title: "Failed to save settings",
            description: "Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const isFormBusy = isPlatformDataFetching || isSavingSettings;
  const isCategoryBusy = isCategoriesFetching || isCreatingCategory || isDeletingCategory;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="platformFeePercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Fee Percentage</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      inputMode="decimal"
                      {...field}
                      value={field.value ?? ""}
                      disabled={isFormBusy}
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormDescription>Fee applied to every completed booking.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxJobRadius"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Job Radius</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      type="number"
                      min={1}
                      max={50}
                      step={1}
                      inputMode="numeric"
                      {...field}
                      value={field.value ?? ""}
                      disabled={isFormBusy}
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>km</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormDescription>Limit how far workshops can receive new requests.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newCategory"
            render={() => (
              <FormItem>
                <FormLabel>Service Categories</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={cn(
                          "flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground"
                        )}
                      >
                        <span>{category.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category.id)}
                          className="text-muted-foreground transition hover:text-foreground"
                          aria-label={`Remove ${category.name}`}
                          disabled={isCategoryBusy}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {!isCategoriesFetching && categories.length === 0 && (
                      <p className="text-sm text-muted-foreground">No categories found.</p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Manage the categories available to users.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Add new category</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      {...field}
                      placeholder="Add new category..."
                      maxLength={maxCategoryLength}
                      className="border border-border"
                      disabled={isCategoryBusy}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        if (form.formState.errors.newCategory) {
                          form.clearErrors("newCategory");
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddCategory();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddCategory}
                      className="sm:w-auto"
                      disabled={isCategoryBusy}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" disabled={isFormBusy}>
            {isSavingSettings ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
