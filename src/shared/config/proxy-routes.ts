/**
 * Edge proxy: public routes and matcher. Keeps `src/proxy.ts` minimal.
 */

export const AUTH_COOKIE_NAME = "token";

export const PUBLIC_PATH_PREFIXES = ["/login", "/api/auth"] as const;

export const PUBLIC_PATHS_EXACT = new Set<string>(["/login"]);

export const AUTH_ONLY_GUEST_PATH_PREFIXES = ["/login"] as const;
