"use client";

import { CalendarClockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRescheduleBooking } from "@/lib/actions/bookings/reschedule-booking";

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
import { DateTimePicker } from "@/components/widgets/date-time-picker";
import type { RescheduleForm } from "@/types";

import { rescheduleFormSchema } from "./reschedule-form.schema";

interface RescheduleFormProps {
  bookingId: string;
  bookingTitle: string;
  onCompleted?: () => void;
}

export function RescheduleForm({ bookingId, bookingTitle, onCompleted }: RescheduleFormProps) {
  const { toast } = useToast();
  const { mutate: rescheduleBooking, isPending } = useRescheduleBooking();

  const form = useForm<RescheduleForm>({
    resolver: zodResolver(rescheduleFormSchema),
    defaultValues: {
      scheduleStart: undefined,
      scheduleEnd: undefined
    }
  });

  const handleSubmit = async (values: RescheduleForm) => {
    try {
      rescheduleBooking(
        {
          bookingId,
          payload: {
            scheduleStart: values.scheduleStart.toISOString(),
            scheduleEnd: values.scheduleEnd.toISOString()
          }
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Booking rescheduled successfully."
            });
            form.reset();
            onCompleted?.();
          },
          onError: (error) => {
            const errorMessage =
              error instanceof Error ? error.message : "Failed to reschedule booking";
            toast({
              variant: "destructive",
              title: "Error",
              description: errorMessage
            });
          }
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reschedule booking";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Reschedule booking</DialogTitle>
        <DialogDescription>Select a new start and end time for your booking.</DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-3 rounded-[20px] bg-secondary/60 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-navy shadow-sm">
          <CalendarClockIcon className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-navy">{bookingTitle}</p>
          <p className="text-xs text-muted-foreground">Confirm your new booking time.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="scheduleStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date and time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select start date and time"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduleEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date and time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select end date and time"
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Rescheduling..." : "Reschedule"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
