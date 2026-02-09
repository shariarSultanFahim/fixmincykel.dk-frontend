import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface RepairQuoteCardProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  className?: string;
}

export function RepairQuoteCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className
}: RepairQuoteCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-white bg-primary shadow-subtle",
        className
      )}
    >
      <div className="relative h-48 w-full bg-white">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="bg-primary px-6 py-5 text-center text-white">
        <h1 className="font-semibold text-white" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
          {title}
        </h1>
        <p className="mt-1 text-white/90" style={{ fontSize: "clamp(10px, 2vw, 14px)" }}>
          {description}
        </p>
      </div>
    </article>
  );
}
