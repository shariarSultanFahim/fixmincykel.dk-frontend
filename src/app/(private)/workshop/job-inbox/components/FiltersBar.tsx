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

export interface SortOption {
  label: string;
  sort: string;
  sortOrder: "asc" | "desc";
}

export interface CategoryOption {
  label: string;
  id: string;
}

interface FiltersBarProps {
  categoryOptions: CategoryOption[];
  sortOptions: SortOption[];
  selectedCategory: string;
  selectedSort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  isCategoriesLoading?: boolean;
}

interface FilterFieldProps<T extends string | { label: string }> {
  label: string;
  options: T[];
  value: string;
  onChange: (value: string | null) => void;
  placeholder: string;
  isLoading?: boolean;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => string;
}

function FilterField<T extends string | { label: string }>({
  label,
  options,
  value,
  onChange,
  placeholder,
  isLoading,
  getLabel,
  getValue
}: FilterFieldProps<T>) {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const normalizedQuery = inputValue.trim().toLowerCase();
  const normalizedValue = value.trim().toLowerCase();
  const shouldFilter = normalizedQuery.length > 0 && normalizedQuery !== normalizedValue;
  const filteredOptions = shouldFilter
    ? options.filter((option) => {
        const label = getLabel ? getLabel(option) : (option as string);
        return label.toLowerCase().includes(normalizedQuery);
      })
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
        <ComboboxInput
          placeholder={placeholder}
          className="w-full border-border"
          showClear
          disabled={isLoading}
        />
        <ComboboxContent>
          <ComboboxList>
            {filteredOptions.map((option) => {
              const optionLabel = getLabel ? getLabel(option) : (option as string);
              const optionValue = getValue ? getValue(option) : (option as string);
              return (
                <ComboboxItem key={optionValue} value={optionValue}>
                  {optionLabel}
                </ComboboxItem>
              );
            })}
          </ComboboxList>
          <ComboboxEmpty>No matches</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function FiltersBar({
  categoryOptions,
  sortOptions,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
  isCategoriesLoading
}: FiltersBarProps) {
  const categoryOptionsWithAll = [{ label: "All Categories", id: "All" }, ...categoryOptions];

  return (
    <Card className={cn("border-0 shadow-md")}>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <FilterField<CategoryOption>
          label="Category"
          options={categoryOptionsWithAll}
          value={selectedCategory}
          onChange={(nextValue) => onCategoryChange(nextValue ?? "All")}
          placeholder="Select category"
          isLoading={isCategoriesLoading}
          getLabel={(option) => option.label}
          getValue={(option) => option.id}
        />
        <FilterField<SortOption>
          label="Sort by"
          options={sortOptions}
          value={selectedSort}
          onChange={(nextValue) => onSortChange(nextValue ?? sortOptions[0]?.label ?? "Newest")}
          placeholder="Sort by"
          getLabel={(option) => option.label}
          getValue={(option) => option.label}
        />
      </CardContent>
    </Card>
  );
}
