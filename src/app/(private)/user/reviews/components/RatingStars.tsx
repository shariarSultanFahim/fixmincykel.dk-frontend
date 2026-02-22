import { StarIcon } from "lucide-react";

import type { RatingStarsProps } from "@/types/review";

import { cn } from "@/lib/utils";

import { Button } from "@/ui";

const STAR_RANGE = [1, 2, 3, 4, 5];

export function RatingStars({ value, onChange, size = "md", readOnly }: RatingStarsProps) {
  const isInteractive = Boolean(onChange) && !readOnly;
  const iconSize = size === "sm" ? "size-4" : "size-6";

  return (
    <div
      className="flex items-center gap-1"
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={isInteractive ? "Choose a rating" : `Rated ${value} out of 5`}
    >
      {STAR_RANGE.map((rating) => {
        const isActive = rating <= value;
        const iconClassName = cn(
          iconSize,
          "transition-colors",
          isActive ? "fill-amber-400 text-amber-400" : "text-muted-foreground/50"
        );

        if (!isInteractive) {
          return <StarIcon key={rating} className={iconClassName} />;
        }

        return (
          <Button
            key={rating}
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn("rounded-full", isActive ? "bg-amber-400/10" : "bg-transparent")}
            onClick={() => onChange?.(rating)}
            aria-label={`Set rating to ${rating}`}
            role="radio"
            aria-checked={rating === value}
          >
            <StarIcon className={iconClassName} />
          </Button>
        );
      })}
    </div>
  );
}
