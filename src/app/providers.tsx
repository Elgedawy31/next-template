"use client";

import { useState, type ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { createQueryClient } from "@/shared/api/query-client";

type AppProvidersProps = {
  children: ReactNode;
  /** Pass from RSC when using `dehydrate` + server prefetch */
  dehydratedState?: DehydratedState;
};

export function AppProviders({ children, dehydratedState }: AppProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  const content =
    dehydratedState !== undefined ? (
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    ) : (
      children
    );

  return (
    <QueryClientProvider client={queryClient}>
      {content}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
