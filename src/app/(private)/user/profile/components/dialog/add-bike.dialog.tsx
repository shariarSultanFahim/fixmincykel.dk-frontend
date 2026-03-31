"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
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
import type { AddBikeDialogProps, UserBikeFormValues } from "@/types";

import { bikeSchema } from "../schema";

const BIKE_TYPE_OPTIONS = Object.values(BikeType);

export function AddBikeDialog({
  ownerId,
  hasPrimaryBike,
  onSubmit: onSaveBike
}: AddBikeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<UserBikeFormValues>({
    resolver: zodResolver(bikeSchema),
    defaultValues: {
      name: "",
      type: BikeType.ROAD,
      brand: "",
      model: "",
      year: "",
      color: "",
      isPrimary: false
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsSaving(true);
      await onSaveBike({ ...values, ownerId });
      toast.success("Bike saved.");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save bike.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="border-dashed text-primary">
          <Plus className="h-4 w-4" />
          Add New Bike
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add a Bike</DialogTitle>
          <DialogDescription>
            Add your bike details so we can personalize service recommendations.
          </DialogDescription>
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
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="Black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrimary"
                render={({ field }) => (
                  <FormItem className="rounded-md border border-input bg-muted/40 px-3 py-2 sm:col-span-2">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <FormLabel>Set as primary bike</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          {hasPrimaryBike
                            ? "A primary bike already exists. Only one bike can be primary."
                            : "You can set this bike as your primary bike."}
                        </p>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(event) => field.onChange(event.target.checked)}
                          disabled={hasPrimaryBike}
                          aria-label="Set as primary bike"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="px-6" disabled={isSaving}>
                Save Bike
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
