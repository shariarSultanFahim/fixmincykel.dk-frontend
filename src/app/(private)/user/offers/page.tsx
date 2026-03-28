"use client";

import { useSearchParams } from "next/navigation";

import { OffersGrid, TipBanner } from "./components";

export default function OffersPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-navy">{jobId ? "Compare Offers" : "My Offers"}</h1>
        <p className="mt-2 text-muted-foreground">
          {jobId
            ? "Compare and select the best workshop for your bike repair"
            : "Compare and select the best workshop for your bike repair"}
        </p>
      </div>

      {!jobId && <TipBanner />}

      <OffersGrid jobId={jobId} />
    </div>
  );
}
