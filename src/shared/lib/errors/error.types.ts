export const AppErrorKind = {
  Network: "network",
  Validation: "validation",
  Authentication: "authentication",
  Authorization: "authorization",
  Server: "server",
  Unknown: "unknown",
} as const;

export type AppErrorKind = (typeof AppErrorKind)[keyof typeof AppErrorKind];

export type AppError = {
  kind: AppErrorKind;
  message: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
  code?: string;
};

export function isAppError(value: unknown): value is AppError {
  if (!value || typeof value !== "object") return false;
  const v = value as AppError;
  return (
    typeof v.message === "string" &&
    typeof v.kind === "string" &&
    Object.values(AppErrorKind).includes(v.kind as AppErrorKind)
  );
}
