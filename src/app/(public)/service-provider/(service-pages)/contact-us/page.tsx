"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BadgeDollarSign, CreditCard, Mail, Package, Tag, Truck } from "lucide-react";

import PaperPlaneIcon from "@/assets/icons/paper-plane.svg";
import Underline from "@/assets/icons/underline.svg";
import faqHeroImage from "@/assets/images/client-faq-bg.jpg";
import contactIllustration from "@/assets/images/kontakt.png";
import { post } from "@/lib/api";

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

const FAQ_CARDS = [
  {
    id: "account-email",
    icon: Mail,
    questionKey: "cards.accountEmail.question",
    answerKey: "cards.accountEmail.answer"
  },
  {
    id: "payment-fails",
    icon: CreditCard,
    questionKey: "cards.paymentFails.question",
    answerKey: "cards.paymentFails.answer"
  },
  {
    id: "cancellation",
    icon: Package,
    questionKey: "cards.cancellation.question",
    answerKey: "cards.cancellation.answer"
  },
  {
    id: "delivery-status",
    icon: Truck,
    questionKey: "cards.deliveryStatus.question",
    answerKey: "cards.deliveryStatus.answer"
  },
  {
    id: "instant-refunds",
    icon: BadgeDollarSign,
    questionKey: "cards.instantRefunds.question",
    answerKey: "cards.instantRefunds.answer"
  },
  {
    id: "apply-coupon",
    icon: Tag,
    questionKey: "cards.applyCoupon.question",
    answerKey: "cards.applyCoupon.answer"
  }
];

export default function ServiceGetInTouchPage() {
  const { t, rich } = useCopy("GetInTouch");
  const { t: tClientFaq } = useCopy("ClientFaq");
  const formRef = useRef<HTMLFormElement>(null);

  const [sucessModalOpen, setSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const additionalInfo = String(formData.get("additional_info") ?? "").trim();
    const payload = {
      companyName: String(formData.get("company_name") ?? "").trim(),
      fullName: String(formData.get("full_name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      ...(additionalInfo ? { additionalInfo } : {})
    };

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await post("/contact/workshop", payload);
      setSuccessModalOpen(true);
      formRef.current?.reset();
    } catch {
      setSubmitError("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {FORM_FIELDS.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-sm font-semibold text-navy">
                  {field.labelKey}
                </label>
                <Input
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholderKey}
                  className="h-10 rounded-md border border-navy/10 bg-white text-sm text-navy shadow-xs placeholder:text-navy/40"
                />
              </div>
            ))}
            <Button className="h-10 w-full rounded-md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Join Today"}
            </Button>
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
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

      <section className="bg-white py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
          <section className="relative overflow-hidden rounded-[14px] border-2">
            <Image
              src={faqHeroImage}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-20 text-center text-white md:py-30">
              <h1 className="text-3xl font-bold text-white md:text-4xl">{tClientFaq("title")}</h1>
              <p className="max-w-xl text-sm text-white md:text-base">{tClientFaq("subtitle")}</p>
              <div className="w-full max-w-sm">
                <label className="sr-only" htmlFor="client-faq-search">
                  {tClientFaq("searchAria")}
                </label>
                <Input
                  id="client-faq-search"
                  placeholder={tClientFaq("searchPlaceholder")}
                  className="h-10 rounded-[14px] border-0 bg-white px-5 text-sm text-navy shadow-sm placeholder:text-navy/60"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FAQ_CARDS.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.id}
                  className="flex h-full flex-col gap-3 rounded-2xl border-2 border-navy/10 bg-white px-6 py-6 shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-semibold text-navy">
                    {tClientFaq(card.questionKey)}
                  </h2>
                  <p className="text-sm text-navy/70">{tClientFaq(card.answerKey)}</p>
                </div>
              );
            })}
          </section>

          <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-6 py-6 text-white md:flex-row md:items-center">
            <div className="flex flex-col">
              <h4 className="text-white">Still have questions?</h4>
              <p className="text-sm text-white/80">{tClientFaq("cta.subtitle")}</p>
            </div>
            <Link href="/service-provider/contact-us">
              <Button className="h-10 px-6" type="button">
                {tClientFaq("cta.button")}
              </Button>
            </Link>
          </section>
        </div>
      </section>
      {sucessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 text-center">
            <h2 className="mb-4 text-lg font-semibold text-navy">
              We&apos;ve received your message, and we will reply within 48 hours.
            </h2>
            <p className="mb-6 text-sm text-navy/70"></p>
            <Button onClick={() => setSuccessModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </section>
  );
}
