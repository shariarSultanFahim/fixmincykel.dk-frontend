import type { ReactNode } from "react";

type ToastActionElement = ReactNode;

interface Toast {
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  onOpenChange?: (open: boolean) => void;
}

export type { Toast, ToastActionElement };
