"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { SendOfferValues } from "@/types/send-offer";

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

import { sendOfferSchema } from "../schema/send-offer-schema";

interface SendOfferFormProps {
  formId: string;
  jobId: string;
  category: string;
  onSuccess?: () => void;
}

export function SendOfferForm({ formId, jobId, category, onSuccess }: SendOfferFormProps) {
  const form = useForm<SendOfferValues>({
    resolver: zodResolver(sendOfferSchema),
    defaultValues: {
      price: "",
      estimatedTime: "",
      message: ""
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Send offer", { jobId, category, ...values });
    toast.success("Offer sent successfully!");
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form id={formId} onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (DKK)</FormLabel>
              <FormControl>
                <Input placeholder="350" inputMode="numeric" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Time</FormLabel>
              <FormControl>
                <Input placeholder="1 hour" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a message to the customer..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
