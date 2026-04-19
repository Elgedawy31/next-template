import type { NextRequest } from "next/server";
import { handleProxyRequest } from "@/shared/lib/proxy/handle-proxy-request";

export function proxy(request: NextRequest) {
  return handleProxyRequest(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
