import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

import { blogsData, getBlogBySlug } from "../data/blogs";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug
  }));
}

export async function generateMetadata(props: BlogDetailPageProps) {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found"
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image]
    }
  };
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="bg-white py-12 md:py-20">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link href="/explore">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 px-0 text-navy hover:bg-transparent hover:text-navy hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Explore
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-navy/10 shadow-lg">
          <div className="relative h-64 w-full md:h-96">
            <Image src={blog.image} alt={blog.imageAlt} fill className="object-cover" priority />
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-4 border-b border-navy/10 pb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex rounded-full bg-secondary/60 px-3 py-1 text-xs font-semibold text-navy">
              {blog.tag}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-navy md:text-4xl">{blog.title}</h1>

          <p className="text-lg text-navy/70">{blog.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-navy/60">
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

        {/* Content Sections */}
        <div className="space-y-10 py-10">
          {blog.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
              <p className="text-base leading-relaxed whitespace-pre-wrap text-navy/80">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Back to Explore */}
        <div className="border-t border-navy/10 pt-8">
          <Link href="/explore">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
