import axios from "axios";
import type { AxiosInstance } from "axios";
import { getApiBaseUrl } from "@/shared/config/env";
import { attachClientInterceptors } from "@/shared/api/interceptors";

let browserClient: AxiosInstance | null = null;

export function getBrowserApiClient(): AxiosInstance {
  if (browserClient) return browserClient;

  const base = getApiBaseUrl();
  const client = axios.create({
    baseURL: base || undefined,
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  attachClientInterceptors(client);
  browserClient = client;
  return client;
}
