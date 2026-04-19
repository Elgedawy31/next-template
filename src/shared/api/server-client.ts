import axios from "axios";
import type { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { getApiBaseUrl } from "@/shared/config/env";
import { AUTH_COOKIE_NAME } from "@/shared/config/proxy-routes";
import {
  attachServerInterceptors,
  type ServerTokenGetter,
} from "@/shared/api/interceptors";

export async function createServerApiClient(): Promise<AxiosInstance> {
  const base = getApiBaseUrl();
  const client = axios.create({
    baseURL: base || undefined,
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
  });

  const getToken: ServerTokenGetter = async () => {
    const jar = await cookies();
    return jar.get(AUTH_COOKIE_NAME)?.value;
  };

  attachServerInterceptors(client, getToken);
  return client;
}
