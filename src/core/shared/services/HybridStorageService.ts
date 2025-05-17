import { IStorageService } from "../../shared/interface/IStorageService";
import { CookieStorageService } from "./CookieStorageService";
import { StorageService } from "./StorageService";

export class HybridStorageService implements IStorageService {
  private cookieStorage: CookieStorageService;
  private localStorage: StorageService;

  private readonly COOKIE_KEYS = ["auth_token"];

  constructor(ctx: Record<string, unknown> | null = null) {
    this.cookieStorage = new CookieStorageService(ctx);
    this.localStorage = new StorageService();
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
