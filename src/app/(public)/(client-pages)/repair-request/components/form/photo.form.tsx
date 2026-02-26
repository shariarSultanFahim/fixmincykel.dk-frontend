"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { post } from "@/lib/api";

import { useToast } from "@/hooks";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { type NewRepair } from "../schema/newRepair.schema";

interface PhotoFormProps {
  form: UseFormReturn<NewRepair>;
}

interface UploadResponse {
  urls: string[];
}

export function PhotoForm({ form }: PhotoFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const photos = form.watch("photos.photos") || [];

  const handleUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setIsLoading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await post<UploadResponse>("/api/repairs/upload-photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.urls && response.urls.length > 0) {
        const currentPhotos = form.getValues("photos.photos") || [];
        form.setValue("photos.photos", [...currentPhotos, ...response.urls]);

        toast({
          title: "Success",
          description: `${response.urls.length} photo(s) uploaded successfully.`
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload photos. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  const removePhoto = (url: string) => {
    const currentPhotos = form.getValues("photos.photos") || [];
    form.setValue(
      "photos.photos",
      currentPhotos.filter((photo: string) => photo !== url)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-navy">Upload photos of the issue</h3>
        <p className="mt-1 text-sm text-gray-600">
          Add 1-4 photos showing the problem. Clear photos help workshops give accurate quotes.
        </p>
      </div>

      <FormField
        control={form.control}
        name="photos.photos"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="space-y-4">
                {/* Upload Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {photos.length === 0 ? (
                    <>
                      <div className="rounded-full bg-primary/10 p-6">
                        <Upload className="h-12 w-12 text-primary" />
                      </div>
                      <p className="mt-4 text-base font-medium text-primary">Add photos</p>
                    </>
                  ) : (
                    <div className="w-full p-6">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {photos.map((photo: string, index: number) => (
                          <div
                            key={`${photo}-${index}`}
                            className="group relative overflow-hidden rounded-lg bg-gray-100"
                          >
                            <Image
                              src={photo}
                              alt={`Repair photo ${index + 1}`}
                              width={100}
                              height={100}
                              className="h-24 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhoto(photo);
                              }}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
                            >
                              <X className="h-5 w-5 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Photo Counter */}
                <p className="text-center text-sm text-gray-600">
                  {photos.length} of 5 photos uploaded (minimum 1 required)
                </p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
