"use client";

import Image from "next/image";

import PaperPlaneIcon from "@/assets/icons/paper-plane.svg";
import Underline from "@/assets/icons/underline.svg";
import contactIllustration from "@/assets/images/kontakt.png";

import { useCopy } from "@/hooks/use-copy";

import { Button, Input } from "@/components/ui";

const FORM_FIELDS = [
  { id: "company_name", labelKey: "Company Name", placeholderKey: "ABC Corp" },
  { id: "full_name", labelKey: "Full Name", placeholderKey: "John Doe" },
  { id: "phone", labelKey: "Phone", placeholderKey: "+45 0000 0000" },
  {
    id: "additional_info",
    labelKey: "Additional Information",
    placeholderKey: "I would like to know more about your services..."
  }
];

export default function ServiceGetInTouchPage() {
  const { t, rich } = useCopy("GetInTouch");

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="relative flex flex-col items-center gap-4 text-center">
          <PaperPlaneIcon
            width={88}
            height={88}
            className="absolute top-0 right-0 hidden md:block"
          />
          <h1 className="text-3xl font-bold text-navy md:text-4xl">
            {rich("title", {
              accent: (chunks) => (
                <span className="relative text-primary">
                  {chunks}
                  <Underline className="w-full" />
                </span>
              )
            })}
          </h1>
          <p className="max-w-xl text-sm text-navy/70 md:text-base">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare
            non id blandit netus.
          </p>
        </header>

        <section className="grid gap-8 rounded-[14px] border border-navy/10 bg-white p-6 shadow-lg md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-8">
          <form className="flex flex-col gap-5">
            {FORM_FIELDS.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-sm font-semibold text-navy">
                  {field.labelKey}
                </label>
                <Input
                  id={field.id}
                  placeholder={field.placeholderKey}
                  className="h-10 rounded-md border border-navy/10 bg-white text-sm text-navy shadow-xs placeholder:text-navy/40"
                />
              </div>
            ))}
            <Button className="h-10 w-full rounded-md" type="submit">
              Join Today
            </Button>
          </form>

          <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-white p-6 text-center">
            <div className="relative h-full w-full">
              <Image
                src={contactIllustration}
                alt={t("illustration.alt")}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
