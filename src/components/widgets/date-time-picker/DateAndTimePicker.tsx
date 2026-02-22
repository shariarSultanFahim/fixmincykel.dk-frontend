"use client";

import * as React from "react";

import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "DD/MM/YYYY HH:mm",
  disabled = false
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i).reverse(), []);
  const minutes = React.useMemo(() => Array.from({ length: 12 }, (_, i) => i * 5), []);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const isPastDate = (checkDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(checkDate);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const updateDate = (nextDate: Date | undefined) => {
    setDate(nextDate);
    onChange?.(nextDate);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const nextDate = new Date(selectedDate);
    if (date) {
      nextDate.setHours(date.getHours());
      nextDate.setMinutes(date.getMinutes());
    }
    updateDate(nextDate);
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const baseDate = date ?? new Date();
    const nextDate = new Date(baseDate);

    if (type === "hour") {
      nextDate.setHours(parseInt(value, 10));
    } else if (type === "minute") {
      nextDate.setMinutes(parseInt(value, 10));
    }

    updateDate(nextDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <Calendar1Icon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy HH:mm") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar selected={date} onSelect={handleDateSelect} disabled={isPastDate} />
          <div className="flex flex-col divide-y sm:h-75 sm:flex-row sm:divide-x sm:divide-y-0">
            <ScrollArea className="w-64 sm:w-auto" type="auto">
              <div className="flex p-2 sm:flex-col" onWheel={(e) => e.stopPropagation()}>
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={date && date.getHours() === hour ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto" type="auto">
              <div className="flex p-2 sm:flex-col" onWheel={(e) => e.stopPropagation()}>
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={date && date.getMinutes() === minute ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("minute", minute.toString())}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const DateTimePicker24h = DateTimePicker;
