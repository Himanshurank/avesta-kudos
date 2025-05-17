import { parseCookies, setCookie, destroyCookie } from "nookies";
import { IStorageService } from "../../shared/interface/IStorageService";

// Just use Record<string, unknown> as nookies accepts many different context types
type CookieContext = Record<string, unknown> | null | undefined;

export class CookieStorageService implements IStorageService {
  // Default cookie options
  private readonly DEFAULT_OPTIONS = {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  // Server context for SSR
  private readonly ctx: CookieContext;

  constructor(ctx: CookieContext = null) {
    this.ctx = ctx;
  }

  getItem(key: string): string | null {
    // When running on the server with context, use it
    const cookies = parseCookies(this.ctx);
    const value = cookies[key] || null;

    if (process.env.NODE_ENV === "development") {
      const isServer = typeof window === "undefined";
      console.log(
        `[CookieStorage] ${isServer ? "Server" : "Client"} getItem(${key}): ${
          value ? "has value" : "null"
        }`
      );
    }

    return value;
  }

  setItem(key: string, value: string): void {
    setCookie(this.ctx, key, value, this.DEFAULT_OPTIONS);

    if (process.env.NODE_ENV === "development") {
      const isServer = typeof window === "undefined";
      console.log(
        `[CookieStorage] ${
          isServer ? "Server" : "Client"
        } setItem(${key}): value set`
      );
    }
  }

  removeItem(key: string): void {
    destroyCookie(this.ctx, key);

    if (process.env.NODE_ENV === "development") {
      const isServer = typeof window === "undefined";
      console.log(
        `[CookieStorage] ${isServer ? "Server" : "Client"} removeItem(${key})`
      );
    }
  }
}
