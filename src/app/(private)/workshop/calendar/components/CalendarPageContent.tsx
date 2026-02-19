"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CalendarData } from "@/types";

import { DayView } from "./dayView/DayView";
import { ListView } from "./listView/ListView";
import { WeekView } from "./weekView/WeekView";

interface CalendarPageContentProps {
  data: CalendarData;
}

export function CalendarPageContent({ data }: CalendarPageContentProps) {
  return (
    <Tabs defaultValue="week" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList className="h-10 rounded-full border border-border/50 bg-white">
          <TabsTrigger
            value="week"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            Week View
          </TabsTrigger>
          <TabsTrigger
            value="day"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            Day View
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="rounded-full px-5 active:bg-primary/10 data-[state=active]:bg-primary/10"
          >
            List View
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="week">
        <WeekView data={data} />
      </TabsContent>
      <TabsContent value="day">
        <DayView data={data} />
      </TabsContent>
      <TabsContent value="list">
        <ListView data={data} />
      </TabsContent>
    </Tabs>
  );
}
