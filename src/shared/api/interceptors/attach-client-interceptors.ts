import type { AxiosInstance } from "axios";
import { getClientAuthToken } from "@/shared/api/auth-token";
import { mapError } from "@/shared/lib/errors";

export function attachClientInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(
    (config) => {
      const token = getClientAuthToken();
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
