"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { SendOfferForm } from "./send-offer-form";

interface SendOfferDialogProps {
  jobId: string;
  category: string;
  trigger: React.ReactNode;
}

export function SendOfferDialog({ jobId, category, trigger }: SendOfferDialogProps) {
  const [open, setOpen] = React.useState(false);
  const formId = `send-offer-${jobId}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Offer</DialogTitle>
        </DialogHeader>
        <div className="space-y-1 text-sm text-navy/70">
          <p>Job ID: {jobId}</p>
          <p>Category: {category}</p>
        </div>
        <SendOfferForm
          formId={formId}
          jobId={jobId}
          category={category}
          onSuccess={() => setOpen(false)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            Send Offer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
