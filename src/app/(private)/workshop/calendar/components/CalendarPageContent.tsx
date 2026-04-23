"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CalendarData } from "@/types";

import { DayView } from "./dayView/DayView";
import { ListView } from "./listView/ListView";
import { WeekView } from "./weekView/WeekView";

interface CalendarPageContentProps {
  weekData: CalendarData;
  dayData: CalendarData;
  listData: CalendarData;
}

export function CalendarPageContent({ weekData, dayData, listData }: CalendarPageContentProps) {
  return (
    <Tabs defaultValue="day" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList className="h-10 rounded-full border border-border/50 bg-white">
          <TabsTrigger
            value="day"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            Day View
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            Week View
          </TabsTrigger>

          <TabsTrigger
            value="list"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            List View
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="day">
        <DayView data={dayData} />
      </TabsContent>
      <TabsContent value="week">
        <WeekView data={weekData} />
      </TabsContent>
      <TabsContent value="list">
        <ListView data={listData} />
      </TabsContent>
    </Tabs>
  );
}
