"use client";

import { useGetBlogs } from "@/lib/actions/blogs/get.blogs";

import AlsoReadCarousel from "../components/also-read-carousel";
import Newsletter from "../components/newslatter";
import Article from "./component/article";

export default function AboutUsPage() {
  const { data: blogsResponse } = useGetBlogs({ page: 1, limit: 100 });
  const blogs = blogsResponse?.data.data ?? [];

  return (
    <section className="py-10">
      <Article />
      <AlsoReadCarousel blogs={blogs} />
      <Newsletter />
    </section>
  );
}
