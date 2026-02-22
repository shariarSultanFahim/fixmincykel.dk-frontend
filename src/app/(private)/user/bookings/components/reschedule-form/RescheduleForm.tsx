"use client";

import { CalendarClockIcon, MessageSquareTextIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/widgets/date-time-picker";
import type { RescheduleForm } from "@/types";

import { rescheduleFormSchema } from "./reschedule-form.schema";

interface RescheduleFormProps {
  bookingTitle: string;
  onCompleted?: () => void;
}

export function RescheduleForm({ bookingTitle, onCompleted }: RescheduleFormProps) {
  const { toast } = useToast();

  const form = useForm<RescheduleForm>({
    resolver: zodResolver(rescheduleFormSchema),
    defaultValues: {
      note: ""
    }
  });

  const handleSubmit = () => {
    console.log("Reschedule request submitted:", form.getValues());
    toast({
      title: "Reschedule request sent",
      description: `We will confirm a new time for ${bookingTitle}.`
    });

    form.reset({ note: "" });
    onCompleted?.();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Reschedule booking</DialogTitle>
        <DialogDescription>
          Pick a new time and add a short note for the workshop.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-3 rounded-[20px] bg-secondary/60 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-navy shadow-sm">
          <CalendarClockIcon className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-navy">{bookingTitle}</p>
          <p className="text-xs text-muted-foreground">We will notify you once approved.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New date and time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select date and time"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message for the workshop</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Let the workshop know what works for you."
                    className={cn("resize-none")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <MessageSquareTextIcon className="size-4" />
              Send request
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
