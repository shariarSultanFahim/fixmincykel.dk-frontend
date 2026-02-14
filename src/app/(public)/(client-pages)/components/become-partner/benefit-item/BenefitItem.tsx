import Tick from "@/assets/icons/tick.svg";

interface BenefitItemProps {
  label: string;
}

export function BenefitItem({ label }: BenefitItemProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-navy">
      <span className="flex size-7 items-center justify-center">
        <Tick className="size-6" aria-hidden="true" />
      </span>
      <span className="font-thin text-white">{label}</span>
    </div>
  );
}
