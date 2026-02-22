"use client";

import { Lightbulb } from "lucide-react";

export function TipBanner() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Compare workshops based on price, rating, and
          availability to find the best option for you.
        </p>
      </div>
    </div>
  );
}
