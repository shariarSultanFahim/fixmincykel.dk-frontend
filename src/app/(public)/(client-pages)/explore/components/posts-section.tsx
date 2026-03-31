"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock } from "lucide-react";

import type { AdminBlog, BlogCategory } from "@/types/blog-manage";

import { useCopy } from "@/hooks/use-copy";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostsSectionProps {
  blogs: AdminBlog[];
  categories: BlogCategory[];
}

export default function PostsSection({ blogs, categories }: PostsSectionProps) {
  const { t } = useCopy("Explore");

  const tabItems = useMemo(
    () => [
      { id: "all-posts", label: t("tabs.allPosts") },
      ...categories.map((category) => ({ id: category.id, label: category.name }))
    ],
    [categories, t]
  );

  const renderCards = (categoryId: string) => {
    const filteredBlogs =
      categoryId === "all-posts" ? blogs : blogs.filter((blog) => blog.categoryId === categoryId);

    return (
      <div className="grid gap-6 md:grid-cols-2">
        {filteredBlogs.map((blog) => {
          const imageUrl = blog.images[0] ?? "/black-cycle.jpg";

          return (
            <Link key={blog.id} href={`/explore/${blog.slug}`}>
              <article className="overflow-hidden rounded-sm border bg-white shadow-md transition-all duration-300 hover:border-primary hover:shadow-lg">
                <div className="relative h-44 w-full sm:h-52">
                  <Image
                    src={imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <span className="text-xs font-semibold text-primary">{blog.category.name}</span>
                  <h3 className="text-lg font-semibold text-navy md:text-xl">{blog.title}</h3>
                  <p className="text-sm text-navy/70">{blog.subTitle}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-navy/60">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="size-4 text-primary" aria-hidden="true" />
                      {new Date(blog.readTime).toLocaleDateString("da-DK")}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                      {new Date(blog.createdAt).toLocaleDateString("da-DK")}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <Tabs defaultValue={tabItems[0]?.id ?? "all-posts"} className="w-full">
        <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-navy/10 bg-transparent p-0">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-semibold text-navy/70 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabItems.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {renderCards(tab.id)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
