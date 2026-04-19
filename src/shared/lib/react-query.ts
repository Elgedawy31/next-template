import {
  dehydrate,
  type DehydratedState,
  type DefaultOptions,
  type QueryClient,
} from "@tanstack/react-query";

export const defaultQueryClientOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: process.env.NODE_ENV === "production",
  },
  mutations: {
    retry: 0,
  },
};

export { dehydrate, type DehydratedState, type QueryClient };

/**
 * Serialize dehydrated state for passing from RSC into {@link HydrationBoundary}.
 */
export function serializeDehydratedState(
  state: DehydratedState,
): DehydratedState {
  return state;
}
