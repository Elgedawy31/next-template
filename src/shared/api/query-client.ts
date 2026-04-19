import { QueryClient } from "@tanstack/react-query";
import { defaultQueryClientOptions } from "@/shared/lib/react-query";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
}
