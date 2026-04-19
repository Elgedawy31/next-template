import { isAxiosError } from "axios";
import { ZodError } from "zod";
import { AppError, AppErrorKind, isAppError } from "./error.types";

function mapZodError(error: ZodError): AppError {
  const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
  const first =
    Object.values(fieldErrors).find((m) => m?.length)?.[0] ??
    "Validation failed";
  return {
    kind: AppErrorKind.Validation,
    message: first,
    fieldErrors,
  };
}

/**
 * Normalize any thrown value into a stable {@link AppError}.
 * UI and hooks must consume this instead of raw Axios errors.
 */
export function mapError(error: unknown): AppError {
  if (isAppError(error)) return error;

  if (error instanceof ZodError) {
    return mapZodError(error);
  }

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as
      | {
          message?: string;
          error?: string;
          errors?: string[] | Record<string, string[]>;
        }
      | undefined;

    let message =
      (typeof data?.error === "string" && data.error) ||
      (typeof data?.message === "string" && data.message) ||
      error.message ||
      "Request failed";

    let fieldErrors: Record<string, string[]> | undefined;
    if (data?.errors) {
      if (Array.isArray(data.errors)) {
        message = data.errors[0] ?? message;
      } else if (typeof data.errors === "object") {
        fieldErrors = data.errors as Record<string, string[]>;
        const first = Object.values(fieldErrors).find((m) => m?.length)?.[0];
        if (first) message = first;
      }
    }

    if (status === 401) {
      return {
        kind: AppErrorKind.Authentication,
        message: "Please sign in to continue.",
        status,
      };
    }
    if (status === 403) {
      return {
        kind: AppErrorKind.Authorization,
        message: "You do not have permission to perform this action.",
        status,
      };
    }
    if (status && status >= 400 && status < 500) {
      return {
        kind: AppErrorKind.Validation,
        message,
        status,
        fieldErrors,
      };
    }
    if (status && status >= 500) {
      return {
        kind: AppErrorKind.Server,
        message: "Server error. Please try again later.",
        status,
      };
    }
    if (error.request && !error.response) {
      return {
        kind: AppErrorKind.Network,
        message: "Network error. Check your connection and try again.",
      };
    }
    return {
      kind: AppErrorKind.Unknown,
      message,
      status,
      fieldErrors,
    };
  }

  if (error instanceof Error) {
    return { kind: AppErrorKind.Unknown, message: error.message };
  }

  return {
    kind: AppErrorKind.Unknown,
    message: "Something went wrong.",
  };
}
