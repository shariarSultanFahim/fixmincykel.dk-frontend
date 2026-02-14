"use client";

import Image from "next/image";
import Link from "next/link";

import { BadgeDollarSign, CreditCard, Mail, Package, Tag, Truck } from "lucide-react";

import faqHeroImage from "@/assets/images/client-faq-bg.jpg";

import { useCopy } from "@/hooks/use-copy";

import { Button, Input } from "@/components/ui";

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

export default function FAQPage() {
  const { t } = useCopy("ClientFaq");

  return (
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
            <h1 className="text-3xl font-bold text-white md:text-4xl">{t("title")}</h1>
            <p className="max-w-xl text-sm text-white md:text-base">{t("subtitle")}</p>
            <div className="w-full max-w-sm">
              <label className="sr-only" htmlFor="client-faq-search">
                {t("searchAria")}
              </label>
              <Input
                id="client-faq-search"
                placeholder={t("searchPlaceholder")}
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
                <h2 className="text-sm font-semibold text-navy">{t(card.questionKey)}</h2>
                <p className="text-sm text-navy/70">{t(card.answerKey)}</p>
              </div>
            );
          })}
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy px-6 py-6 text-white md:flex-row md:items-center">
          <p className="text-sm text-white/80">{t("cta.subtitle")}</p>
          <Link href="/get-in-touch">
            <Button className="h-10 px-6" type="button">
              {t("cta.button")}
            </Button>
          </Link>
        </section>
      </div>
    </section>
  );
}
