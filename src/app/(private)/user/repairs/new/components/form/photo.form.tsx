"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { post } from "@/lib/api";

import { useToast } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card className="border-0 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-navy">Photos</h3>
          <p className="mt-1 text-sm text-gray-600">
            Add photos to help workshops better understand the issue
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
                    className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
                      dragActive ? "border-primary bg-primary/10" : "border-gray-300 bg-gray-50"
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

                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 font-medium text-navy">Drag and drop photos here</p>
                    <p className="text-sm text-gray-600">or</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="mt-3 border-gray-200 text-navy hover:bg-gray-100"
                    >
                      {isLoading ? "Uploading..." : "Browse Files"}
                    </Button>
                  </div>

                  {/* Photo Gallery */}
                  {photos.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-navy">
                        Uploaded Photos ({photos.length})
                      </p>
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
                              onClick={() => removePhoto(photo)}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
