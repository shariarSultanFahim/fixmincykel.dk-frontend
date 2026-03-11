"use client";

import { Plus, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

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

const CATEGORIES = [
  { value: "for-cyclists", label: "For Cyclists" },
  { value: "for-workshop", label: "For Workshop" },
  { value: "tech-tips", label: "Tech Tips" }
] as const;

interface BlogFormProps {
  form: UseFormReturn<BlogFormValues>;
  onSubmit: (data: BlogFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
}

export default function BlogForm({
  form,
  onSubmit,
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the blog post..."
                      className="min-h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. Tools & Maintenance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. 5 min read" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. March 1, 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the image for accessibility" {...field} />
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-3 gap-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => field.onChange(cat.value)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-3 text-sm font-medium transition hover:border-primary",
                          field.value === cat.value
                            ? "border-primary bg-primary/10 text-navy"
                            : "border-gray-200 bg-white text-gray-600"
                        )}
                      >
                        {cat.label}
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
              onClick={() => append({ title: "", content: "" })}
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
                  name={`sections.${index}.title`}
                  render={({ field: sectionField }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Section Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Introduction" {...sectionField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sections.${index}.content`}
                  render={({ field: sectionField }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Content</FormLabel>
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
