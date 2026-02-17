import { cn } from "@/lib/utils";

interface BenefitsCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function BenefitsCard({ title, description, icon: Icon, className }: BenefitsCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col items-center gap-4 rounded-2xl border border-muted bg-white p-6 text-center shadow-subtle",
        className
      )}
    >
      <div className="flex size-15 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-navy md:text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}
