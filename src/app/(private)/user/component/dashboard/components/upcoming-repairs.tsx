"use client";

import React from "react";

import { MapPin } from "lucide-react";

import { currencyFormatter } from "@/constants/currency-formatter";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { RescheduleForm } from "../../../bookings/components";

export function UpcomingRepairs() {
  const [isOpen, setIsOpen] = React.useState(false);
  const repairs = [
    {
      time: "Tomorrow, 09:00",
      service: "Brake Repair",
      workshop: "Copenhagen Bike Repair",
      address: "Noerrebrogade 42, 2200 Kobenhavn N",
      price: "350"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <span>🔧</span> Upcoming Repairs
      </h2>

      {repairs.map((repair, idx) => (
        <Card key={idx} className="border-0 shadow-sm">
          <div className="space-y-4 px-6">
            <div>
              <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {repair.time}
              </div>
              <h3 className="mt-2 font-semibold text-navy">{repair.service}</h3>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-semibold text-navy">@ {repair.workshop}</p>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{repair.address}</span>
              </div>
            </div>

            <p className="text-lg font-semibold text-primary">
              {currencyFormatter.format(Number(repair.price))}
            </p>

            <div className="flex gap-2">
              <Button key={idx} size="sm" variant="default" className="flex-1">
                View Details
              </Button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full flex-1">
                    Reschedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-0">
                  <RescheduleForm
                    bookingTitle={repair.service}
                    onCompleted={() => setIsOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
