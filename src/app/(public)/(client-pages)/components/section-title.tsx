import Image from "next/image";

export default function Title({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-center text-[32px]">{title}</h1>
      <Image
        src="/underline.svg"
        alt="underline"
        width={400}
        height={20}
        className="w-64 sm:w-80 md:w-96 lg:w-125"
      />
      <p className="max-w-2xl text-center text-sm text-muted-foreground md:text-base">{subtitle}</p>
    </div>
  );
}
