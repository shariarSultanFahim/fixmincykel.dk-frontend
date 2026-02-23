"use client";

import { useCallback } from "react";

import { Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

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

import { settingsDefaults } from "../../data/settings";
import { settingsSchema, type SettingsFormValues } from "../schemas/settings-schema";

export default function SettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settingsDefaults
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "serviceCategories"
  });

  const handleAddCategory = useCallback(() => {
    const newCategory = form.getValues("newCategory")?.trim();

    if (!newCategory) {
      return;
    }

    const exists = fields.some((field) => field.name.toLowerCase() === newCategory.toLowerCase());

    if (exists) {
      form.setValue("newCategory", "");
      return;
    }

    append({ name: newCategory });
    form.setValue("newCategory", "");
  }, [append, fields, form]);

  const handleSubmit = (values: SettingsFormValues) => {
    console.log("Form submitted with values:", values);
  };

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
            name="serviceCategories"
            render={() => (
              <FormItem>
                <FormLabel>Service Categories</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {fields.map((category, index) => (
                      <div
                        key={category.id}
                        className={cn(
                          "flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground"
                        )}
                      >
                        <span>{category.name}</span>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-muted-foreground transition hover:text-foreground"
                          aria-label={`Remove ${category.name}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
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
                      className="border border-border"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddCategory();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddCategory} className="sm:w-auto">
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
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
