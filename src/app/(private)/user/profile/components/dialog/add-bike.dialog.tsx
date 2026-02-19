"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import type { UserBikeFormValues } from "@/types";

import { bikeSchema } from "../schema";

export function AddBikeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<UserBikeFormValues>({
    resolver: zodResolver(bikeSchema),
    defaultValues: {
      name: "",
      type: "",
      year: "",
      color: "",
      frameSize: ""
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("New bike", values);
    toast.success("Bike saved.");
    form.reset();
    setIsOpen(false);
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
                      <Input className="bg-muted/60" placeholder="Road Bike" {...field} />
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
                name="frameSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frame Size</FormLabel>
                    <FormControl>
                      <Input className="bg-muted/60" placeholder="56cm" {...field} />
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
              <Button type="submit" className="px-6">
                Save Bike
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
