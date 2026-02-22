"use client";

import * as React from "react";

import {
  CalendarClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Booking } from "@/types";

import { RescheduleForm } from "../reschedule-form";

interface UpcomingBookingCardProps {
  booking: Booking;
}

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0
});

export function UpcomingBookingCard({ booking }: UpcomingBookingCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="border-0 shadow-sm">
      <div className="flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-navy">
              <CalendarClockIcon className="size-6" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-navy">{booking.title}</p>
              <p className="text-sm text-muted-foreground">{booking.jobId}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Workshop
              </p>
              <p className="text-sm font-semibold text-navy">{booking.workshop.name}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="mt-0.5 size-4" />
                  <span>{booking.workshop.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-4" />
                  <span>{booking.workshop.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="size-4" />
                  <span>{booking.workshop.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Date & time
              </p>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-navy">
                  {new Date(booking.scheduledAt).toLocaleDateString("en-DK", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(booking.scheduledAt).toLocaleTimeString("en-DK", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:items-end">
          <div className="space-y-1 text-left lg:text-right">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Estimate
            </p>
            <p className="text-xl font-semibold text-primary">
              {currencyFormatter.format(booking.priceDkk)}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-auto">
            <Button className={cn("w-full lg:w-auto")}>
              <MessageCircleIcon className="size-4" />
              Message workshop
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-secondary-foreground lg:w-auto">
                  Reschedule
                </Button>
              </DialogTrigger>
              <DialogContent className="border-0">
                <RescheduleForm bookingTitle={booking.title} onCompleted={() => setIsOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
