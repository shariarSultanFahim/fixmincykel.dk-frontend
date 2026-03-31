"use client";

import { useGetBlogCategories } from "@/lib/actions/blogs/get.blog-categories";
import { useGetBlogs } from "@/lib/actions/blogs/get.blogs";

import AlsoReadCarousel from "../components/also-read-carousel";
import FeaturedArticle from "./components/featured-article";
import PostsSection from "./components/posts-section";

export default function Explore() {
  const { data: blogsResponse } = useGetBlogs({ page: 1, limit: 100 });
  const { data: categoriesResponse } = useGetBlogCategories(1, 100);

  const blogs = blogsResponse?.data.data ?? [];
  const categories = categoriesResponse?.data.data ?? [];

  return (
    <section className="container space-y-20 bg-white py-20">
      <FeaturedArticle blogs={blogs} />
      <PostsSection blogs={blogs} categories={categories} />
      <AlsoReadCarousel blogs={blogs} />
    </section>
  );
}
