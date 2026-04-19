import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().optional().default(""),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!parsed.success) {
    const message = parsed.error.flatten().fieldErrors;
    throw new Error(
      `Invalid environment variables: ${JSON.stringify(message)}`,
    );
  }

  return parsed.data;
}

export const env = parseEnv();

export function getApiBaseUrl(): string {
  const base = env.NEXT_PUBLIC_API_URL;
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}
