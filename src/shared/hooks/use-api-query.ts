import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getBrowserApiClient } from "@/shared/api/browser-client";
import { isAppError } from "@/shared/lib/errors";

export function useApiQuery<TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  url: string,
  options?: Omit<
    UseQueryOptions<TData, Error, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<TData> => {
      const client = getBrowserApiClient();
      try {
        const res = await client.get<TData>(url);
        return res.data;
      } catch (e) {
        if (isAppError(e)) {
          throw new Error(e.message);
        }
        throw e;
      }
    },
    ...options,
  });
}
