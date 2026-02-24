"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onSearch,
  placeholder = "Search workshops..."
}: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="border-border pl-10"
      />
    </div>
  );
}
