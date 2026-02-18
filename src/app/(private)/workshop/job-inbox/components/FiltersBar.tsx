"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox";

interface FiltersBarProps {
  statusOptions: string[];
  categoryOptions: string[];
  sortOptions: string[];
}

function FilterField({
  label,
  options,
  value,
  onChange,
  placeholder
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string | null) => void;
  placeholder: string;
}) {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const normalizedQuery = inputValue.trim().toLowerCase();
  const normalizedValue = value.trim().toLowerCase();
  const shouldFilter = normalizedQuery.length > 0 && normalizedQuery !== normalizedValue;
  const filteredOptions = shouldFilter
    ? options.filter((option) => option.toLowerCase().includes(normalizedQuery))
    : options;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-navy/70">{label}</p>
      <Combobox
        value={value}
        inputValue={inputValue}
        onInputValueChange={(nextValue) => setInputValue(nextValue)}
        onValueChange={(nextValue) => {
          onChange(nextValue);
          setInputValue(nextValue ?? "");
        }}
      >
        <ComboboxInput placeholder={placeholder} className="w-full border-border" showClear />
        <ComboboxContent>
          <ComboboxList>
            {filteredOptions.map((option) => (
              <ComboboxItem key={option} value={option}>
                {option}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No matches</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function FiltersBar({ statusOptions, categoryOptions, sortOptions }: FiltersBarProps) {
  const [status, setStatus] = React.useState(statusOptions[0] ?? "All");
  const [category, setCategory] = React.useState(categoryOptions[0] ?? "All");
  const [sortBy, setSortBy] = React.useState(sortOptions[0] ?? "Newest");

  return (
    <Card className={cn("border-0 shadow-md")}>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <FilterField
          label="Status"
          options={statusOptions}
          value={status}
          onChange={(nextValue) => setStatus(nextValue ?? "All")}
          placeholder="Select status"
        />
        <FilterField
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(nextValue) => setCategory(nextValue ?? "All")}
          placeholder="Select category"
        />
        <FilterField
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={(nextValue) => setSortBy(nextValue ?? "Newest")}
          placeholder="Sort by"
        />
      </CardContent>
    </Card>
  );
}
