import { IStorageService } from "../../shared/interface/IStorageService";

export class StorageService implements IStorageService {
  getItem(key: string): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}
