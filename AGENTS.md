<!-- BEGIN:nextjs-agent-rules -->

# Project Rules (Next.js 16 + FSD + Bun)

This project uses a modern Next.js setup with breaking changes.

## Critical Rules:

* Use Next.js 16 conventions only (App Router, proxy.ts instead of middleware)
* Do NOT use deprecated APIs
* Always check Next.js docs inside node_modules before coding

## Architecture Rules:

* Follow Feature-Sliced Design strictly
* Do NOT break layer boundaries (features, entities, shared)
* Use `src/views` as page composition layer
* Keep `src/app` thin (routing only)

## UI Rules:

* Use shadcn/ui components
* Follow Atomic Design:

  * shared/ui → atoms & molecules
  * widgets → organisms

## Data & API:

* Use Axios abstraction (client/server separated)
* Use TanStack React Query
* Do NOT call APIs directly inside components

## Forms:

* Use React Hook Form + Zod + shadcn form components
* Prefer reusable form fields

## Proxy:

* Use src/proxy.ts as edge routing layer
* Keep it thin (no business logic inside)

## Code Quality:

* Follow ESLint rules and boundaries
* Avoid deep imports (use public index.ts)

## Testing:

* Use Vitest + Testing Library
* Write tests for features and shared UI

Always follow these rules before generating any code.

<!-- END:nextjs-agent-rules -->
