import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusBreakdownCardProps {
  breakdowns: {
    workshops: Record<string, number>;
    jobs: Record<string, number>;
    bookings: Record<string, number>;
  };
}

const formatStatusLabel = (value: string) => {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getEntries = (statusMap: Record<string, number>) => {
  return Object.entries(statusMap).sort((a, b) => b[1] - a[1]);
};

export default function StatusBreakdownCard({ breakdowns }: StatusBreakdownCardProps) {
  const workshopStatuses = getEntries(breakdowns.workshops);
  const jobStatuses = getEntries(breakdowns.jobs);
  const bookingStatuses = getEntries(breakdowns.bookings);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Status Breakdowns</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="space-y-3 rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">Workshops</h3>
          <div className="space-y-2">
            {workshopStatuses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data</p>
            ) : (
              workshopStatuses.map(([status, count]) => (
                <div
                  key={`workshop-${status}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{formatStatusLabel(status)}</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">Jobs</h3>
          <div className="space-y-2">
            {jobStatuses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data</p>
            ) : (
              jobStatuses.map(([status, count]) => (
                <div key={`job-${status}`} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{formatStatusLabel(status)}</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground">Bookings</h3>
          <div className="space-y-2">
            {bookingStatuses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data</p>
            ) : (
              bookingStatuses.map(([status, count]) => (
                <div
                  key={`booking-${status}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{formatStatusLabel(status)}</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
