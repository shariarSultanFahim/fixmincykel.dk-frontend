"use client";

import Image from "next/image";

import { CalendarDays, Clock } from "lucide-react";

import winterBikeImage from "@/assets/images/cycle.jpg";

import { useCopy } from "@/hooks/use-copy";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TAB_ITEMS = [
  { id: "all-posts", labelKey: "tabs.allPosts" },
  { id: "for-cyclists", labelKey: "tabs.forCyclists" },
  { id: "for-workshop", labelKey: "tabs.forWorkshop" },
  { id: "tech-tips", labelKey: "tabs.techTips" }
];

const POST_CARDS = [
  {
    id: "essential-tools",
    tagKey: "cards.essentialTools.tag",
    titleKey: "cards.essentialTools.title",
    descriptionKey: "cards.essentialTools.description",
    readTimeKey: "cards.essentialTools.readTime",
    dateKey: "cards.essentialTools.date",
    imageAltKey: "cards.essentialTools.imageAlt"
  },
  {
    id: "home-repair-guide",
    tagKey: "cards.homeRepairGuide.tag",
    titleKey: "cards.homeRepairGuide.title",
    descriptionKey: "cards.homeRepairGuide.description",
    readTimeKey: "cards.homeRepairGuide.readTime",
    dateKey: "cards.homeRepairGuide.date",
    imageAltKey: "cards.homeRepairGuide.imageAlt"
  },
  {
    id: "winter-setup",
    tagKey: "cards.winterSetup.tag",
    titleKey: "cards.winterSetup.title",
    descriptionKey: "cards.winterSetup.description",
    readTimeKey: "cards.winterSetup.readTime",
    dateKey: "cards.winterSetup.date",
    imageAltKey: "cards.winterSetup.imageAlt"
  },
  {
    id: "workshop-upgrades",
    tagKey: "cards.workshopUpgrades.tag",
    titleKey: "cards.workshopUpgrades.title",
    descriptionKey: "cards.workshopUpgrades.description",
    readTimeKey: "cards.workshopUpgrades.readTime",
    dateKey: "cards.workshopUpgrades.date",
    imageAltKey: "cards.workshopUpgrades.imageAlt"
  }
];

export default function PostsSection() {
  const { t } = useCopy("Explore");

  const renderCards = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {POST_CARDS.map((card) => (
        <article key={card.id} className="overflow-hidden rounded-sm border bg-white shadow-md">
          <div className="relative h-44 w-full sm:h-52">
            <Image src={winterBikeImage} alt={t(card.imageAltKey)} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-3 p-5">
            <span className="text-xs font-semibold text-primary">{t(card.tagKey)}</span>
            <h3 className="text-lg font-semibold text-navy md:text-xl">{t(card.titleKey)}</h3>
            <p className="text-sm text-navy/70">{t(card.descriptionKey)}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-navy/60">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                {t(card.readTimeKey)}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                {t(card.dateKey)}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4">
      <Tabs defaultValue={TAB_ITEMS[0].id} className="w-full">
        <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-navy/10 bg-transparent p-0">
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-navy/70 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
            >
              {t(tab.labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_ITEMS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {renderCards()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
