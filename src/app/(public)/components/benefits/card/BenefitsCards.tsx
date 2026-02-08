import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface BenefitsCardProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  className?: string;
}

export function BenefitsCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className
}: BenefitsCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col items-center gap-4 rounded-2xl border border-muted bg-white p-6 text-center shadow-subtle",
        className
      )}
    >
      <div className="flex size-20 items-center justify-center">
        <Image src={imageSrc} alt={imageAlt} width={100} height={100} className="object-contain" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-navy md:text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}
