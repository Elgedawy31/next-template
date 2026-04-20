"use server";

import type { LoginResponse } from "@/features/auth/types";
import type { LoginSchema } from "@/features/auth/lib/login-schema";
import { cookies } from "next/headers";
import { createServerApiClient } from "@/shared/api/server-client";
import { AUTH_COOKIE_NAME } from "@/shared/config/proxy-routes";

export async function loginRequest(
  values: LoginSchema,
): Promise<LoginResponse> {
  const client = await createServerApiClient();
  const { data } = await client.post<LoginResponse>("/auth/login", values);

  const token = data.user.token ?? data.token;
  if (token) {
    const jar = await cookies();
    jar.set(AUTH_COOKIE_NAME, token, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return data;
}
