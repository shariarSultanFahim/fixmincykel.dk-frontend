"use client";

import { Plus, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import type { BlogCategory } from "@/types/blog-manage";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import ImageUploader from "../ImageUploader";
import type { BlogFormValues } from "../schemas/blog-schema";

interface BlogFormProps {
  form: UseFormReturn<BlogFormValues>;
  onSubmit: (data: BlogFormValues) => void;
  categories: BlogCategory[];
  isSubmitting?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export default function BlogForm({
  form,
  onSubmit,
  categories,
  isSubmitting,
  submitLabel = "Save Blog",
  onCancel
}: BlogFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections"
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="border-2 border-navy/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-navy">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. Essential Tools Every Cyclist Should Have"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short subtitle for the blog post..."
                      className="min-h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-gray-600">
              Author and publish time are automatically set from the current logged-in session.
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field.value as File | string | undefined}
                      onChange={field.onChange}
                      onClear={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Category */}
        <Card className="border-2 border-navy/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-navy">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => field.onChange(cat.id)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-3 text-sm font-medium transition hover:border-primary",
                          field.value === cat.id
                            ? "border-primary bg-primary/10 text-navy"
                            : "border-gray-200 bg-white text-gray-600"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card className="border-2 border-navy/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-navy">Content Sections</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({ heading: "", details: "" })}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">
                No sections yet. Click &ldquo;Add Section&rdquo; to get started.
              </p>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">Section {index + 1}</span>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`sections.${index}.heading`}
                  render={({ field: sectionField }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Section Heading</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Introduction" {...sectionField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sections.${index}.details`}
                  render={({ field: sectionField }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write the section content..."
                          className="min-h-25 resize-none"
                          {...sectionField}
                          value={sectionField.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <FormMessage>{form.formState.errors.sections?.message}</FormMessage>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
