"use client";

import { useState } from "react";

import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";

import { Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type NewRepair } from "../schema/newRepair.schema";

interface DateTimeFormProps {
  form: UseFormReturn<NewRepair>;
}

const TIME_SLOTS = {
  Morning: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "12:30 PM",
    "1:30 PM",
    "2:30 PM",
    "3:30 PM"
  ],
  Evening: ["4:00 PM", "5:00 PM", "6:00 PM", "4:30 PM", "5:30 PM", "6:30 PM"]
};

export function DateTimeForm({ form }: DateTimeFormProps) {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <Card className="border-0 bg-white p-6 shadow-sm">
      <div className="space-y-8">
        {/* Date Selection */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-navy">Select Preferred Date</h3>
            <p className="mt-1 text-sm text-gray-600">Tap a date to continue</p>

            <FormField
              control={form.control}
              name="dateTime.preferredDate"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-gray-200 bg-white text-left text-navy hover:bg-gray-50"
                      >
                        {field.value ? format(field.value, "MMMM d, yyyy") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-gray-200 p-0" align="start">
                      <Calendar
                        selected={field.value}
                        onSelect={(date: Date) => {
                          field.onChange(date);
                          setOpenDatePicker(false);
                        }}
                        disabled={(date: Date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-lg font-semibold text-navy">Select Preferred Time</h3>

            <div className="mt-4 space-y-4">
              {Object.entries(TIME_SLOTS).map(([period, times]) => (
                <div key={period}>
                  <p className="mb-2 text-sm font-medium text-gray-700">{period}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {times.slice(0, 4).map((time) => (
                      <FormField
                        key={time}
                        control={form.control}
                        name="dateTime.preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(time);
                                }}
                                className={`w-full rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                                  field.value === time
                                    ? "border-primary bg-primary/10 text-navy"
                                    : "border-gray-200 bg-white text-navy hover:border-gray-300"
                                }`}
                              >
                                {time}
                              </button>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom Time Option */}
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-navy">Or order custom time</p>
                <FormField
                  control={form.control}
                  name="dateTime.customTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          placeholder="HH:MM AM/PM"
                          className="border-gray-200 bg-white text-navy"
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value) {
                              form.setValue("dateTime.preferredTime", "custom");
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Note: </span>
            This is your preferred time. The service center will confirm.
          </p>
        </div>
      </div>
    </Card>
  );
}
