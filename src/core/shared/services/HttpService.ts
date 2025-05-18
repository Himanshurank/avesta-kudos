import { IHttpService } from "../interface/IHttpService";
import { IConfigService } from "../interface/IConfigService";
import { IStorageService } from "../interface/IStorageService";

export class HttpService implements IHttpService {
  private readonly TOKEN_KEY = "auth_token";

  constructor(
    private readonly configService: IConfigService,
    private readonly storageService: IStorageService
  ) {}

  private getBaseUrl(): string {
    return this.configService.getAppConfig().apiBaseUrl;
  }

  private getAuthHeader(): Record<string, string> {
    const token = this.storageService.getItem(this.TOKEN_KEY);
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  }

  private createUrl(
    path: string,
    queryParams?: Record<string, string | number | boolean>
  ): string {
    const url = new URL(`${this.getBaseUrl()}/${path}`);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
          `Request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  }

  async get<T>(params: {
    path: string;
    queryParams?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
  }): Promise<T> {
    const { path, queryParams, headers = {} } = params;
    const url = this.createUrl(path, queryParams);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T> {
    const { path, body, headers = {} } = params;
    const url = this.createUrl(path);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T> {
    const { path, body, headers = {} } = params;
    const url = this.createUrl(path);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T> {
    const { path, body, headers = {} } = params;
    const url = this.createUrl(path);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(params: {
    path: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T> {
    const { path, body, headers = {} } = params;
    const url = this.createUrl(path);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    return this.handleResponse<T>(response);
  }
}
