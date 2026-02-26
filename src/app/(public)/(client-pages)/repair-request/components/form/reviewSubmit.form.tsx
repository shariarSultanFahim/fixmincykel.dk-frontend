"use client";

import { useState } from "react";

import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";

import { Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { type NewRepair } from "../schema/newRepair.schema";

interface ReviewSubmitFormProps {
  form: UseFormReturn<NewRepair>;
}

const TIME_SLOTS = {
  Morning: [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "8:30 AM",
    "9:30 AM",
    "10:30 AM",
    "11:30 AM"
  ],
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

export function ReviewSubmitForm({ form }: ReviewSubmitFormProps) {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formData = form.getValues();

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-navy">Review and submit</h3>

        <Card className="border-gray-200 bg-white p-4">
          <h4 className="font-semibold text-navy">Your request summary</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-navy">Category:</span>{" "}
              <span className="text-gray-700">{formData.details.category || "Not selected"}</span>
            </div>
            <div>
              <span className="font-semibold text-navy">Photos:</span>{" "}
              <span className="text-gray-700">{formData.photos.photos.length} uploaded</span>
            </div>
            <div>
              <span className="font-semibold text-navy">Location:</span>{" "}
              <span className="text-gray-700">{`${formData.location.city}, ${formData.location.address}`}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Date and Time Selection */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Date Selection */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-navy">Select Preferred Date</h4>
            <p className="text-sm text-gray-600">Tap a date to continue</p>
          </div>

          <FormField
            control={form.control}
            name="dateTime.preferredDate"
            render={({ field }) => (
              <FormItem>
                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start border-gray-200 bg-white text-left text-navy hover:bg-gray-50"
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
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Select Preferred Time</h4>

          <div className="space-y-4">
            {Object.entries(TIME_SLOTS).map(([period, times]) => (
              <div key={period}>
                <p className="mb-2 text-sm font-medium text-gray-700">{period}</p>
                <div className="grid grid-cols-4 gap-2">
                  {times.map((time) => (
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
                                form.setValue("dateTime.customTime", "");
                              }}
                              className={`w-full rounded-lg border px-2 py-2 text-xs font-medium transition ${
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
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">Or enter custom time</p>
              <FormField
                control={form.control}
                name="dateTime.customTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="Enter time: HH:MM AM/PM"
                        className="border-gray-200 bg-white text-navy"
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value) {
                            form.setValue("dateTime.preferredTime", "");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-blue-600">
                Note: This is your preferred time. The service center will confirm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="dateTime.additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">Additional notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other information workshops should know..."
                  {...field}
                  className="min-h-24 border-gray-200 bg-white text-navy placeholder-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
