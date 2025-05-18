export interface IHttpService {
  get<T>(params: {
    path: string;
    queryParams?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
  }): Promise<T>;

  post<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T>;

  put<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T>;

  patch<T>(params: {
    path: string;
    body: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T>;

  delete<T>(params: {
    path: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<T>;
}
