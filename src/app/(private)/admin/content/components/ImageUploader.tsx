"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: File | string;
  onChange: (file: File) => void;
  onClear?: () => void;
}

export default function ImageUploader({ value, onChange, onClear }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const previewUrl = useMemo(() => {
    if (value instanceof File) return URL.createObjectURL(value);
    if (typeof value === "string" && value.length > 0) return value;
    return null;
  }, [value]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  if (previewUrl) {
    return (
      <div className="relative h-48 overflow-hidden rounded-xl border-2 border-navy/10">
        <Image src={previewUrl} alt="Cover image preview" fill className="object-cover" />
        <div className="absolute inset-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/40 to-transparent p-3">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => inputRef.current?.click()}
            className="h-7 gap-1 text-xs"
          >
            Replace
          </Button>
          {onClear && (
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onClear}
              className="h-7 w-7 p-0"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition",
        dragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary/5"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <div className="rounded-full bg-primary/10 p-4">
        <Upload className="h-7 w-7 text-primary" />
      </div>
      <p className="mt-3 text-sm font-medium text-navy">Drag & drop or click to upload</p>
      <p className="mt-1 text-xs text-gray-500">PNG, JPG, WebP – max 5 MB</p>
    </div>
  );
}
