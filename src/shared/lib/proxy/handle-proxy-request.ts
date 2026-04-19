import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_ONLY_GUEST_PATH_PREFIXES,
  PUBLIC_PATH_PREFIXES,
  PUBLIC_PATHS_EXACT,
} from "@/shared/config/proxy-routes";

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS_EXACT.has(pathname)) return true;
  return PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function handleProxyRequest(request: NextRequest): NextResponse {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (
    token &&
    AUTH_ONLY_GUEST_PATH_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
