import { NextResponse } from "next/server";
import { z } from "zod";
import { AUTH_COOKIE_NAME } from "@/shared/config/proxy-routes";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    user: { id: "demo-user", email: parsed.data.email },
  });

  /**
   * Readable cookie so the dev client can mirror Bearer from `document.cookie`.
   * Prefer httpOnly + same-origin session APIs in production.
   */
  response.cookies.set(AUTH_COOKIE_NAME, "demo-token", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
