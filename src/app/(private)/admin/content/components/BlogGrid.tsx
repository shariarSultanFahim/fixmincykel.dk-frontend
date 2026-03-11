"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Plus, Search } from "lucide-react";

import type { Blog } from "@/types/blog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BlogCard from "./BlogCard";

const BLOGS_PER_PAGE = 9;

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.tag.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filtered.slice(start, start + BLOGS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search blogs by title or tag..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link href="/admin/content/new">
          <Button className="bg-primary text-white hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Blog
          </Button>
        </Link>
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium text-navy">No blogs found</p>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? "Try adjusting your search." : "Start by adding your first blog post."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-primary text-white" : ""}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
