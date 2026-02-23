import { activityFeed, jobBreakdownStats, kpiStats, quickActions } from "../data/dashboard";
import { ActivityFeedCard, JobsBreakdownCard, KpiCard, QuickActionsCard } from "./widgets";

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <KpiCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <JobsBreakdownCard stats={jobBreakdownStats} />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeedCard items={activityFeed} />
        </div>
        <div className="lg:col-span-1">
          <QuickActionsCard actions={quickActions} />
        </div>
      </section>
    </div>
  );
}
