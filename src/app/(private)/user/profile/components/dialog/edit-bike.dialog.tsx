"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { BikeType } from "@/types/job-create";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import type { EditBikeDialogProps, UserBikeFormValues } from "@/types";

import { bikeSchema } from "../schema";

const BIKE_TYPE_OPTIONS = Object.values(BikeType);

export function EditBikeDialog({ bike, onSubmit: onSubmitBike }: EditBikeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<UserBikeFormValues>({
    resolver: zodResolver(bikeSchema),
    defaultValues: {
      name: bike.name,
      type: bike.type,
      brand: bike.brand,
      model: bike.model,
      year: String(bike.year),
      color: bike.color
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsSaving(true);
      await onSubmitBike(bike.id, values);
      toast.success("Bike updated.");
      setIsOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update bike.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="link" size="sm" className="px-0">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Bike</DialogTitle>
          <DialogDescription>Update bike details to keep your profile accurate.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bike Name</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="Canyon Roadlite" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full rounded-md border border-input bg-muted/60 px-3 py-2 text-sm"
                      >
                        {BIKE_TYPE_OPTIONS.map((bikeType) => (
                          <option key={bikeType} value={bikeType}>
                            {bikeType}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="Yamaha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="R15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted/60"
                        inputMode="numeric"
                        placeholder="2023"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="Black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="px-6" disabled={isSaving}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
