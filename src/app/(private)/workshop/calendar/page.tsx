import { Suspense } from "react";

import { CalendarDays } from "lucide-react";

import type { CalendarData } from "@/types";

import { CalendarPageContent } from "./components/CalendarPageContent";
import { CalendarPageSkeleton } from "./components/CalendarPageSkeleton";
import calendarData from "./data/calender.json";

export default function CalendarPage() {
  const data = calendarData as CalendarData;

  return (
    <div className="space-y-6 py-8">
      <header className="flex items-center gap-2 text-navy">
        <CalendarDays className="size-4" />
        <h1 className="text-lg font-semibold">Calendar</h1>
      </header>
      <Suspense fallback={<CalendarPageSkeleton />}>
        <CalendarPageContent data={data} />
      </Suspense>
    </div>
  );
}
