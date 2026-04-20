FROM oven/bun:1.2.18-alpine AS base
WORKDIR /app

FROM base AS deps-dev
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM base AS deps-prod
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production --ignore-scripts

FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.2.18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S bunjs && adduser -S nextjs -G bunjs

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:bunjs /app
USER nextjs

EXPOSE 3000

CMD ["bun", "server.js"]
