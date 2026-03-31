"use client";

import { useGetAnalytics } from "@/lib/actions/analytics/get-analytics";

import { Card, CardContent } from "@/components/ui";

import { RatingCard, RatingCardSkeleton, StatCard, StatCardSkeleton } from "./components";

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0
});

function AnalyticsContent() {
  const { data: analyticsResponse, isLoading, isError } = useGetAnalytics();
  const analytics = analyticsResponse?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-navy">Analytics</h1>
          {/* <Button variant="ghost" className="border border-secondary hover:border-primary" disabled>
            <Download className="h-4 w-4" />
            Download Data
          </Button> */}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <RatingCardSkeleton />
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <Card className="rounded-2xl border-none shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          Failed to load analytics. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Analytics</h1>
        {/* <Button variant="ghost" className="border border-secondary hover:border-primary">
          <Download className="h-4 w-4" />
          Download Data
        </Button> */}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          label="Total Offers Made"
          value={analytics.totalOffersMade.toString()}
          color="text-navy"
        />
        <StatCard
          label="Total Bookings"
          value={analytics.totalBookings.toString()}
          color="text-navy"
        />
        <StatCard
          label="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          color="text-navy"
        />
        <StatCard
          label="Platform Fees"
          value={currencyFormatter.format(analytics.platformFees)}
          color="text-destructive"
        />
        <StatCard
          label="Your Revenue"
          value={currencyFormatter.format(analytics.workshopRevenue)}
          color="text-emerald-600"
        />
      </div>

      <RatingCard score={analytics.avgRating} reviews={analytics.reviewsCount} reportUrl="#" />
    </div>
  );
}

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
