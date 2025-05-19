export interface IConfigService {
  getAppConfig(): AppConfig;
  getApiPaths(): ApiPaths;
}

export interface AppConfig {
  apiBaseUrl: string;
}

export interface ApiPaths {
  auth: {
    register: string;
    login: string;
    logout: string;
    resetPasswordRequest: string;
    resetPassword: string;
  };
  users: {
    getAll: string;
    getById: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
    approval: (id: number) => string;
  };
  kudos: {
    create: string;
    getAll: string;
    getById: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
    filter: string;
  };
  teams: {
    create: string;
    getAll: string;
    getById: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
  };
  categories: {
    create: string;
    getAll: string;
    getById: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
  };
  analytics: {
    statistics: string;
    timeBased: string;
    trendingKeywords: string;
  };
}
