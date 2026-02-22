"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import type { ReviewFormProps, ReviewFormValues } from "@/types/review";

import { cn } from "@/lib/utils";

import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea
} from "@/ui";

import { RatingStars } from "../components/RatingStars";
import { reviewFormSchema } from "../schemas";

const REVIEW_TIPS = [
  "Be honest and specific about your experience.",
  "Mention the quality of the repair work.",
  "Comment on customer service and communication.",
  "Note the workshop's professionalism and cleanliness."
];

export function ReviewForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
  helperText,
  isSubmitting
}: ReviewFormProps) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const commentValue = useWatch({
    control: form.control,
    name: "comment"
  });

  const characterCount = commentValue?.length ?? 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy">How would you rate this workshop?</FormLabel>
              <FormControl>
                <RatingStars value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy">Share your experience</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-32 bg-muted shadow-xs"
                  placeholder="Tell other cyclists about your repair experience, the quality of work, customer service, and anything else that might be helpful."
                  maxLength={500}
                />
              </FormControl>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <FormDescription>Minimum 10 characters</FormDescription>
                <span className={cn(characterCount >= 500 && "text-destructive")}>
                  {characterCount}/500
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}

        <Card className="border-0 bg-secondary/40">
          <CardContent className="space-y-2 py-4">
            <p className="text-xs font-semibold text-navy">Review tips</p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-navy/70">
              {REVIEW_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="submit" disabled={isSubmitting} className="min-w-36">
            {submitLabel}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            {submitLabel === "Submit review" ? "Skip for now" : "Cancel"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
