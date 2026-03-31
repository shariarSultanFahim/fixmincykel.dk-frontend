"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock } from "lucide-react";

import type { AdminBlog } from "@/types/blog-manage";

import Underline from "@/assets/icons/underline.svg";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "@/components/ui";

interface FeaturedArticleProps {
  blogs: AdminBlog[];
}

export default function FeaturedArticle({ blogs }: FeaturedArticleProps) {
  const { t } = useCopy("Explore");
  const featuredBlog = blogs[0];

  if (!featuredBlog) {
    return null;
  }

  const imageUrl = featuredBlog.images[0] ?? "/black-cycle.jpg";

  return (
    <div className="mx-auto flex w-full flex-col gap-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-bold text-navy md:text-4xl">{t("title")}</h1>
        <Underline className="w-56 sm:w-64 md:w-72" aria-hidden="true" />
      </header>

      <section className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-lg">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="relative min-h-64 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <Image
              src={imageUrl}
              alt={featuredBlog.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-5 p-6 md:p-8">
            <span className="inline-flex w-fit items-center rounded-full bg-secondary/60 px-3 py-1 text-xs font-semibold text-navy">
              Featured
            </span>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-navy md:text-3xl">{featuredBlog.title}</h2>
              <p className="text-sm text-navy/70 md:text-base">{featuredBlog.subTitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-navy/70">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                {new Date(featuredBlog.readTime).toLocaleDateString("da-DK")}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                {new Date(featuredBlog.createdAt).toLocaleDateString("da-DK")}
              </span>
            </div>
            <Button asChild className="h-10 px-6">
              <Link href={`/explore/${featuredBlog.slug}`}>{t("cta")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
