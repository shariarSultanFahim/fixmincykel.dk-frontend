"use client";

import Image from "next/image";

import PaperPlaneIcon from "@/assets/icons/paper-plane.svg";
import Underline from "@/assets/icons/underline.svg";
import contactIllustration from "@/assets/images/kontakt.png";
import { cn } from "@/lib/utils";

import { useCopy } from "@/hooks/use-copy";

import { Button, Input } from "@/components/ui";

const FORM_FIELDS = [
  { id: "full-name", labelKey: "form.fullName", placeholderKey: "John Doe" },
  { id: "address", labelKey: "form.address", placeholderKey: "123 Main St" },
  { id: "email", labelKey: "form.email", placeholderKey: "john@example.com" },
  { id: "phone", labelKey: "form.phone", placeholderKey: "+45 0000 0000" }
];

export default function GetInTouchPage() {
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
          <p className="max-w-xl text-sm text-navy/70 md:text-base">{t("subtitle")}</p>
        </header>

        <section className="grid gap-8 rounded-[14px] border border-navy/10 bg-white p-6 shadow-lg md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-8">
          <form className="flex flex-col gap-5">
            {FORM_FIELDS.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-sm font-semibold text-navy">
                  {t(field.labelKey)}
                </label>
                <Input
                  id={field.id}
                  placeholder={field.placeholderKey}
                  className="h-10 rounded-md border border-navy/10 bg-white text-sm text-navy shadow-xs placeholder:text-navy/40"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-navy">
                {t("form.message")}
              </label>
              <textarea
                id="message"
                placeholder="I would like to know more about your services..."
                className={cn(
                  "min-h-40 rounded-md border border-navy/10 bg-white px-3 py-2 text-sm text-navy shadow-xs",
                  "placeholder:text-navy/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                )}
              />
            </div>
            <Button className="h-10 w-full rounded-md" type="submit">
              {t("form.submit")}
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
