import type { LoginResponse } from "@/features/auth/types";
import type { LoginSchema } from "@/features/auth/lib/login-schema";
import { getBrowserApiClient } from "@/shared/api/browser-client";

export async function loginRequest(
  values: LoginSchema,
): Promise<LoginResponse> {
  const client = getBrowserApiClient();
  const { data } = await client.post<LoginResponse>("/api/auth/login", values);
  return data;
}
