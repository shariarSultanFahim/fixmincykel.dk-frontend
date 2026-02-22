"use client";

import { currencyFormatter } from "@/constants/currency-formatter";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Offer {
  amount: string;
}

interface BaseJob {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  actions: string[];
}

interface JobWithOffers extends BaseJob {
  offers: Offer[];
}

interface JobWithWorkshop extends BaseJob {
  workshop: string;
}

type Job = JobWithOffers | JobWithWorkshop;

export function CurrentActiveJobs() {
  const jobs: Job[] = [
    {
      id: "JOB-2050",
      title: "Gear Problem",
      status: "Comparing Offers (3 offers received)",
      statusColor: "bg-amber-100 text-amber-800",
      offers: [{ amount: "350" }, { amount: "300" }, { amount: "400" }],
      actions: ["View Offers", "Cancel"]
    },
    {
      id: "JOB-2048",
      title: "Brake Squeaking",
      status: "Booked (Oct 16, 09:00)",
      statusColor: "bg-green-100 text-green-800",
      workshop: "Copenhagen Bike Repair",
      actions: ["View Booking", "Message"]
    }
  ];

  const isJobWithOffers = (job: Job): job is JobWithOffers => "offers" in job;
  const isJobWithWorkshop = (job: Job): job is JobWithWorkshop => "workshop" in job;

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <span>⚙️</span> Current Active Jobs
      </h2>

      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden border-0 shadow-sm">
          <div className="space-y-4 px-6">
            <div>
              <h3 className="font-semibold text-navy">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.id}</p>
            </div>

            <div
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${job.statusColor}`}
            >
              {job.status}
            </div>

            {/* Offers Section */}
            {isJobWithOffers(job) && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Offers:</p>
                <div className="flex gap-2">
                  {job.offers.map((offer, idx) => (
                    <div
                      key={idx}
                      className="rounded-full border border-gray-300 px-3 py-1 text-xs"
                    >
                      {currencyFormatter.format(Number(offer.amount))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Workshop Section */}
            {isJobWithWorkshop(job) && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Workshop:</p>
                <p className="text-sm text-navy">{job.workshop}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {job.actions.map((action, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={idx === 0 ? "default" : "outline"}
                  className="flex-1"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
