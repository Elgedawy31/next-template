# Next Template

A **production-oriented Next.js 16** starter for teams who want **Feature-Sliced Design (FSD)**, strict layer boundaries, and a **modern data + forms stack** out of the box. Built for real products, portfolios, and open-source reuse—not a generic `create-next-app` tutorial.

---

## Why this template

- **Scalable layout:** FSD-style layers with a dedicated **`views`** composition layer (avoids Next’s reserved `src/pages` for the Pages Router).
- **UI system:** shadcn-inspired primitives and form helpers live under **`shared/ui`** (atoms/molecules); **widgets** hold layout-level organisms (navbar, footer, shell).
- **Typed boundaries:** Server/client API clients, **normalized errors** (`AppError`), and **Zod-validated env** reduce drift as the app grows.
- **Quality gates:** ESLint architectural rules, Prettier, Husky + lint-staged, Vitest + Testing Library.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **Next.js 16** (App Router, React 19) |
| Edge | **`src/proxy.ts`** (Next 16 proxy; auth redirects, public routes) |
| Runtime / PM | **Bun** |
| Styling | **Tailwind CSS v4** |
| UI | **shadcn-style** components (Radix + CVA) in `shared/ui` |
| Global UI state | **Zustand** |
| Server state | **TanStack React Query** (+ hydration-ready providers) |
| HTTP | **Axios** — browser client + **server-only** client factory |
| Forms | **React Hook Form** + **Zod** + `@hookform/resolvers` |
| Feedback | **Sonner** (client-only toast helpers) |
| Icons | **Lucide React** |
| Language | **TypeScript** (strict) |

---

## Architecture

### FSD layers (`src/`)

| Layer | Role |
|-------|------|
| **`app`** | Routes, root layout, providers, API route handlers. Keep files thin; compose from `views` / `widgets`. |
| **`views`** | **Page-level compositions** (the FSD “pages” concept). Assembles widgets + features for a screen. **Not** Next’s `pages/` router. |
| **`widgets`** | Reusable **organisms** (e.g. navbar, footer, app shell) built from `shared/ui` and lower layers. |
| **`features`** | Vertical slices (`auth`, …) with `api`, `model`, `ui`, `lib`, `types` as needed. |
| **`entities`** | Shared domain types/pieces used by multiple features (kept minimal in the template). |
| **`shared`** | Cross-cutting code only: `api`, `config`, `hooks`, `lib`, `ui`, `utils`, etc. |

### Atomic design (practical mapping)

- **Atoms / molecules:** `shared/ui` (buttons, inputs, **form-fields**, form primitives, skeleton, …).
- **Organisms:** `widgets/*` (navbar, footer, main layout).

### Public API (barrels)

Each slice exposes an **`index.ts`** at its root. Prefer **`@/features/auth`**, **`@/widgets/navbar`**, **`@/shared/ui`** over deep internal paths.

---

## Folder structure (`src`)

```
src/
├── app/                    # App Router: routes, layouts, providers
│   ├── api/                # Route handlers (e.g. mock auth)
│   ├── login/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── proxy.ts                # Next 16 edge proxy (auth gate)
├── views/                  # Page compositions (FSD “pages”)
│   ├── home/
│   └── login/
├── widgets/                # Organisms (navbar, footer, shell)
│   ├── navbar/
│   ├── footer/
│   └── main-layout/
├── features/               # Vertical slices
│   └── auth/
├── entities/               # Shared domain primitives
│   └── user/
├── shared/                 # Cross-cutting infrastructure
│   ├── api/                # Query client, Axios clients, interceptors
│   ├── config/             # env (Zod), proxy route config
│   ├── hooks/
│   ├── lib/                # cn, errors, react-query helpers, proxy logic, client-toast
│   ├── ui/                 # shadcn-style UI + form-fields
│   └── utils/              # logger
└── test/                   # Vitest setup + test utils
```

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) **or** Node 20+ if you use npm.

### Install & dev

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` to `.env.local` and adjust if you use a remote API base URL (`NEXT_PUBLIC_API_URL`).

### npm / pnpm / yarn (fallback)

```bash
npm install
npm run dev
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Next.js dev server |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | ESLint (includes **FSD boundary** rules) |
| `bun run lint:fix` | ESLint with `--fix` |
| `bun run format` | Prettier write |
| `bun run format:check` | Prettier check (CI-friendly) |
| `bun run test` | Vitest (single run) |
| `bun run test:watch` | Vitest watch mode |
| `bun run test:coverage` | Vitest + **v8 coverage** |
| `bun run prepare` | Husky install (runs on `postinstall` / clone) |

---

## What’s included

- **Auth example:** Login UI (`features/auth`) + mock **`POST /api/auth/login`** setting a session cookie; Zustand store stub for user state.
- **API layer:** Browser Axios instance with interceptors; **server** client factory for Server Components / server actions (import from `@/shared/api/server-client` only on the server). Errors normalized via **`mapError`** → `AppError` (UI should not rely on raw Axios shapes).
- **Forms:** React Hook Form + Zod + reusable **`shared/ui/form-fields`**.
- **Toasts:** **`shared/lib/toast/client-toast`** — client-only; never import from Server Components.
- **Edge proxy:** `src/proxy.ts` delegates to **`handleProxyRequest`**; public routes and cookie name live in **`shared/config/proxy-routes.ts`**.
  > **Note:** Next requires a **static** `config.matcher` in `proxy.ts` for the compiler—keep it in sync with your routing if you change exclusions.

---

## Code quality

- **ESLint** — `eslint-config-next` + TypeScript rules + **`eslint-plugin-boundaries`** (`boundaries/dependencies`) so features cannot depend on other features, entities cannot depend on features, etc.
- **Prettier** — Integrated with ESLint via `eslint-config-prettier`.
- **Husky + lint-staged** — Format and lint-fix on staged files before commit.
- **Barrel exports** — Enforced by convention; use slice `index.ts` as the public surface.

---

## Testing

- **Vitest** + **jsdom** + **Testing Library** (`@testing-library/react`, `user-event`, `jest-dom`).
- **Coverage:** `@vitest/coverage-v8` via `bun run test:coverage`.
- **Examples:** `shared/ui` component test + `features/auth` login form test under `src/**/*.test.tsx`.

---

## Use as a GitHub template

1. Push this repo to GitHub.
2. Enable **Template repository** in **Settings → General → Template repository**, **or** use the green **“Use this template”** button once published.
3. Clone your new repo, run `bun install`, and start replacing `features/*` / `views/*` with your product slices.

Alternatively: **Fork** the repo and change `origin` to your remote.

---

## Roadmap ideas

- **CI/CD** — GitHub Actions for `lint`, `test`, `build` on every PR.
- **Auth hardening** — JWT / refresh tokens, httpOnly-only cookies, OAuth providers.
- **i18n** — `next-intl` or similar with locale-aware routing.

---

## Contributing

Issues and pull requests are welcome. Please run **`bun run lint`** and **`bun run test`** before opening a PR.

---

## Acknowledgements

Built with [Next.js](https://nextjs.org/), [Bun](https://bun.sh/), [TanStack Query](https://tanstack.com/query), and the excellent patterns from the React / shadcn communities.
