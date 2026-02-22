import {
  CurrentActiveJobs,
  QuickActions,
  QuickStatusCards,
  RecentActivity,
  RecentOffers,
  UpcomingRepairs
} from "./component/dashboard/components";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Quick Status Cards */}
      <div>
        <QuickStatusCards />
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          <CurrentActiveJobs />
          <UpcomingRepairs />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <RecentOffers />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
