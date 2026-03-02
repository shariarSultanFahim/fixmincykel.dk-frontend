"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getBlogsByCategory } from "../data/blogs";

const TAB_ITEMS = [
  { id: "all-posts", labelKey: "tabs.allPosts", categoryValue: "all-posts" as const },
  { id: "for-cyclists", labelKey: "tabs.forCyclists", categoryValue: "for-cyclists" as const },
  { id: "for-workshop", labelKey: "tabs.forWorkshop", categoryValue: "for-workshop" as const },
  { id: "tech-tips", labelKey: "tabs.techTips", categoryValue: "tech-tips" as const }
];

export default function PostsSection() {
  const { t } = useCopy("Explore");

  const renderCards = (categoryValue: (typeof TAB_ITEMS)[number]["categoryValue"]) => {
    const blogs = getBlogsByCategory(categoryValue);
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/explore/${blog.slug}`}>
            <article className="overflow-hidden rounded-sm border bg-white shadow-md transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="relative h-44 w-full sm:h-52">
                <Image src={blog.image} alt={blog.imageAlt} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <span className="text-xs font-semibold text-primary">{blog.tag}</span>
                <h3 className="text-lg font-semibold text-navy md:text-xl">{blog.title}</h3>
                <p className="text-sm text-navy/70">{blog.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-navy/60">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4 text-primary" aria-hidden="true" />
                    {blog.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                    {blog.date}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
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
            {renderCards(tab.categoryValue)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
