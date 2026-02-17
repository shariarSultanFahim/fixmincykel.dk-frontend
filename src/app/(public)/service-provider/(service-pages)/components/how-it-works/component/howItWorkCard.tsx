"use client";

import Image, { StaticImageData } from "next/image";

interface HowItWorkCardProps {
  number: number;
  image: StaticImageData;
  title: string;
  description: string;
  isAlternate?: boolean;
}

export default function HowItWorkCard({ number, image, title, description }: HowItWorkCardProps) {
  return (
    <div className="flex items-center gap-6 border-b border-secondary pb-8">
      {/* Content Section */}
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-navy">{number}.</span>
          <h3 className="text-lg font-bold text-navy">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Image Section */}
      <div className="flex h-24 w-24 items-center justify-center bg-white">
        <Image src={image} alt={title} height={96} width={96} className="object-contain" />
      </div>
    </div>
  );
}
