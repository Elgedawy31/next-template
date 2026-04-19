"use client";

import { toast as sonnerToast } from "sonner";

/** Client-only toasts. Do not import from Server Components or server modules. */

export const clientToast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  warning: (message: string) => sonnerToast.warning(message),
};
