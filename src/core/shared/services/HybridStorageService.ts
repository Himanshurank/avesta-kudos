import { IStorageService } from "../../shared/interface/IStorageService";
import { CookieStorageService } from "./CookieStorageService";
import { StorageService } from "./StorageService";

export class HybridStorageService implements IStorageService {
  private cookieStorage: CookieStorageService;
  private localStorage: StorageService;

  // Keys that should be stored in cookies instead of localStorage
  private readonly COOKIE_KEYS = ["auth_token"];

  constructor(ctx: Record<string, unknown> | null = null) {
    this.cookieStorage = new CookieStorageService(ctx);
    this.localStorage = new StorageService();

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[HybridStorage] Created ${
          typeof window === "undefined" ? "server-side" : "client-side"
        } with${ctx ? "" : "out"} context`
      );
    }
  }

  getItem(key: string): string | null {
    if (this.COOKIE_KEYS.includes(key)) {
      return this.cookieStorage.getItem(key);
    }
    return this.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (this.COOKIE_KEYS.includes(key)) {
      this.cookieStorage.setItem(key, value);
    } else {
      this.localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.COOKIE_KEYS.includes(key)) {
      this.cookieStorage.removeItem(key);
    } else {
      this.localStorage.removeItem(key);
    }
  }
}
