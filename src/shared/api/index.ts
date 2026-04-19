export { createQueryClient } from "./query-client";
export { getBrowserApiClient } from "./browser-client";
/** Import from `@/shared/api/server-client` in server-only modules only. */
export {
  attachClientInterceptors,
  attachServerInterceptors,
  type ServerTokenGetter,
} from "./interceptors";
