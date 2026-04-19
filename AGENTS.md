# Agent and contributor guide

This document is for **AI coding agents** and **human contributors** working on **next-template**: a **Next.js 16** application using **Feature-Sliced Design (FSD)**, **Bun**, strict **ESLint boundaries**, and a typed **API / forms / errors** stack. Follow it before adding or changing code.

For human-oriented setup and scripts, see [README.md](./README.md).

---

## Non-negotiables

- **Next.js 16 only:** App Router, React 19, TypeScript strict. Do not introduce the **Pages Router** (`src/pages` as route tree). Page composition lives in **`src/views`**.
- **Edge entry:** Use **`src/proxy.ts`** (the Next 16 **proxy** convention), not `middleware.ts`. Keep the exported function thin; put rules in **`src/shared/lib/proxy/handle-proxy-request.ts`** and config in **`src/shared/config/proxy-routes.ts`**.
- **Static proxy matcher:** `export const config.matcher` in `proxy.ts` must remain **statically analyzable** by the compiler. Do not derive it from a shared constant spread at build time; if you change exclusions, update the literal in `proxy.ts` and keep behavior aligned with `proxy-routes.ts`.
- **Layer boundaries:** Respect **`eslint-plugin-boundaries`** (`boundaries/dependencies`). Features must not import other features; entities must not import features; lower layers must not depend on higher layers.
- **Public API:** Import from slice **`index.ts`** (e.g. `@/features/auth`, `@/shared/ui`). Avoid deep imports into another slice’s internals.

---

## Layer responsibilities

| Layer | Path | Responsibility |
|-------|------|------------------|
| **app** | `src/app/` | Routes, layouts, global providers, route handlers. **Thin:** compose `views` / `widgets`, no business-heavy UI here. |
| **views** | `src/views/` | Screen-level composition (FSD “pages”). Wire widgets + features for a route. |
| **widgets** | `src/widgets/` | Layout organisms (navbar, footer, shells) built from `shared` + lower layers. |
| **features** | `src/features/` | Vertical slices (`api`, `model`, `ui`, `lib`, `types`). Prefer container / presentational split where it helps. |
| **entities** | `src/entities/` | Shared domain types or primitives used by multiple features. |
| **shared** | `src/shared/` | Cross-cutting: `api`, `config`, `hooks`, `lib`, `ui`, `utils`. No product-specific flows. |

**Atomic design (this repo):** atoms and molecules → **`src/shared/ui`**; organisms → **`src/widgets`**.

---

## Server vs client

- **`@/shared/api/server-client`:** **Server-only** (uses `next/headers`). Never import from Client Components or shared barrels that would pull it into the client bundle.
- **`@/shared/api/browser-client`:** Client-side HTTP; uses interceptors and cookies where applicable.
- **`@/shared/lib/toast/client-toast`:** **Client-only** (`"use client"`). Do not import from Server Components or server modules; return structured errors from the server and toast from a client boundary.

---

## Data and API

- Prefer **feature `api/`** modules or **shared hooks** that call **`getBrowserApiClient()`** / server factories—not raw `fetch` scattered in UI.
- **Errors:** Interceptors normalize failures with **`mapError`** → **`AppError`**. UI and hooks should handle **`AppError`** or mapped messages, not raw Axios error shapes.
- **Server state:** **TanStack Query** — use **`createQueryClient`** from `src/shared/api/query-client.ts` and defaults from `src/shared/lib/react-query.ts`. Respect hydration patterns when adding SSR prefetch.
- **Global client UI state:** **Zustand** in feature `model/` when appropriate.

---

## Forms

- **React Hook Form** + **Zod** + **`@hookform/resolvers`**.
- Use **shadcn-style** form primitives under **`src/shared/ui`** and reusable fields under **`src/shared/ui/form-fields`** for new forms (e.g. text/password fields).

---

## Configuration and env

- **Environment:** Validated in **`src/shared/config/env.ts`** (Zod). Add variables there and document them in **`.env.example`**.
- **Proxy routes:** Public prefixes and cookie name live in **`src/shared/config/proxy-routes.ts`**.

---

## Styling and UI

- **Tailwind CSS v4**; tokens and theme live in **`src/app/globals.css`**.
- Reuse **`cn`** from **`src/shared/lib/cn.ts`** for class merging.
- New primitives should match existing **shadcn-style** patterns in **`src/shared/ui`** and be exported from **`src/shared/ui/index.ts`** when part of the public UI surface.

---

## Testing and quality

- **Vitest** + **Testing Library** + **jsdom**. Colocate tests as **`*.test.ts(x)`** beside sources or under clear test folders; **`src/test/`** holds setup and shared test utils.
- Before finishing a change, run **`bun run lint`** and **`bun run test`** (or ensure CI equivalents will pass).
- **Husky + lint-staged** run on commit; keep staged changes formatted and lint-clean.

---

## What to avoid

- Creating **`src/pages`** for FSD “pages” (conflicts with Next Pages Router).
- **`middleware.ts`** for new edge logic (use **`proxy.ts`**).
- **Cross-feature imports** or **entities importing features**.
- **Toasts or `window` / `document`** in Server Components or in modules imported by them.
- **Generic create-next-app** patterns that bypass this architecture (e.g. dumping logic in `src/app/page.tsx` instead of `views` / `features`).

---

## Quick verification

```bash
bun run lint
bun run test
bun run build
```

---

## References

- [README.md](./README.md) — install, scripts, template usage.
- [Next.js documentation](https://nextjs.org/docs) — App Router, Route Handlers, **Proxy**.
- [Feature-Sliced Design](https://feature-sliced.design/) — layering and public API discipline.
