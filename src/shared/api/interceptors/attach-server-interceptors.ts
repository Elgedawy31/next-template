import type { AxiosInstance } from "axios";
import { mapError } from "@/shared/lib/errors";

export type ServerTokenGetter = () => Promise<string | undefined>;

export function attachServerInterceptors(
  client: AxiosInstance,
  getToken: ServerTokenGetter,
): void {
  client.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(mapError(error)),
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(mapError(error)),
  );
}
