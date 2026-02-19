"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

interface MobileSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MobileSearch({ searchQuery, onSearchChange }: MobileSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search conversations..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-9 pl-9 text-sm"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
