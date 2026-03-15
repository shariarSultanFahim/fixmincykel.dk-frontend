import { cn } from "@/lib/utils";

import type { BikeCardProps, UserBikeFormValues } from "@/types";

import { EditBikeDialog } from "./dialog";

interface BikeCardWithActionProps extends BikeCardProps {
  onEditBike: (bikeId: string, values: UserBikeFormValues) => Promise<void>;
}

export function BikeCard({ bike, variant, onEditBike }: BikeCardWithActionProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-background px-4 py-3 text-sm",
        variant === "primary" && "border-navy/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-navy">
            {variant === "primary" ? "Primary Bike" : "Additional Bike"}
          </p>
          <p className="text-xs text-muted-foreground">{bike.name}</p>
        </div>
        <EditBikeDialog bike={bike} onSubmit={onEditBike} />
      </div>
      <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
        <p>
          <span className="font-semibold text-navy">Type:</span> {bike.type}
        </p>
        <p>
          <span className="font-semibold text-navy">Year:</span> {bike.year}
        </p>
        <p>
          <span className="font-semibold text-navy">Brand:</span> {bike.brand}
        </p>
        <p>
          <span className="font-semibold text-navy">Model:</span> {bike.model}
        </p>
        <p>
          <span className="font-semibold text-navy">Color:</span> {bike.color}
        </p>
      </div>
    </div>
  );
}
