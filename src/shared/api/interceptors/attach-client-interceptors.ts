import type { AxiosInstance } from "axios";
import { AUTH_COOKIE_NAME } from "@/shared/config/proxy-routes";
import { mapError } from "@/shared/lib/errors";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function attachClientInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(
    (config) => {
      const token = readCookie(AUTH_COOKIE_NAME);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
