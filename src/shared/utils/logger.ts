type LoggerMethod = (...args: unknown[]) => void;

export interface Logger {
  log: LoggerMethod;
  warn: LoggerMethod;
  error: LoggerMethod;
  info: LoggerMethod;
  debug: LoggerMethod;
}

function stringifyArgs(args: unknown[]): string {
  return args
    .map((arg) => {
      try {
        if (typeof arg === "object" && arg !== null) {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      } catch (e) {
        return `[Unserializable: ${(e as Error).message}]`;
      }
    })
    .join(" ");
}

export const logger: Logger = {
  log: (...args: unknown[]): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(stringifyArgs(args));
    }
  },

  warn: (...args: unknown[]): void => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(stringifyArgs(args));
    }
  },

  error: (...args: unknown[]): void => {
    console.error(stringifyArgs(args));
  },

  info: (...args: unknown[]): void => {
    if (process.env.NODE_ENV !== "production") {
      console.info(stringifyArgs(args));
    }
  },

  debug: (...args: unknown[]): void => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(stringifyArgs(args));
    }
  },
};

export function createNamespacedLogger(namespace: string): Logger {
  return {
    log: (...args: unknown[]) => logger.log(`[${namespace}]`, ...args),
    warn: (...args: unknown[]) => logger.warn(`[${namespace}]`, ...args),
    error: (...args: unknown[]) => logger.error(`[${namespace}]`, ...args),
    info: (...args: unknown[]) => logger.info(`[${namespace}]`, ...args),
    debug: (...args: unknown[]) => logger.debug(`[${namespace}]`, ...args),
  };
}

export default logger;
