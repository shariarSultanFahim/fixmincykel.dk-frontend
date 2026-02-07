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
    <article className={cn("overflow-hidden rounded-2xl border bg-white shadow-subtle", className)}>
      <div className="relative h-48 w-full bg-white">
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain p-6" />
      </div>
      <div className="bg-primary px-6 py-5 text-center text-white">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-white/90">{description}</p>
      </div>
    </article>
  );
}
