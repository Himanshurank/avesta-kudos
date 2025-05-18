import {
  IConfigService,
  AppConfig,
  ApiPaths,
} from "../interface/IConfigService";

export class ConfigService implements IConfigService {
  getAppConfig(): AppConfig {
    return {
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
      environment: process.env.NODE_ENV || "development",
    };
  }

  getApiPaths(): ApiPaths {
    return {
      auth: {
        register: "auth/register",
        login: "auth/login",
        logout: "auth/logout",
        resetPasswordRequest: "auth/reset-password-request",
        resetPassword: "auth/reset-password",
      },
      users: {
        getAll: "users",
        getById: (id: number) => `users/${id}`,
        update: (id: number) => `users/${id}`,
        delete: (id: number) => `users/${id}`,
        approval: (id: number) => `users/${id}/approval`,
      },
      kudos: {
        create: "kudos",
        getAll: "kudos",
        getById: (id: number) => `kudos/${id}`,
        update: (id: number) => `kudos/${id}`,
        delete: (id: number) => `kudos/${id}`,
        filter: "kudos/filter",
      },
      teams: {
        create: "teams",
        getAll: "teams",
        getById: (id: number) => `teams/${id}`,
        update: (id: number) => `teams/${id}`,
        delete: (id: number) => `teams/${id}`,
      },
      categories: {
        create: "categories",
        getAll: "categories",
        getById: (id: number) => `categories/${id}`,
        update: (id: number) => `categories/${id}`,
        delete: (id: number) => `categories/${id}`,
      },
      analytics: {
        statistics: "analytics/kudos-statistics",
        timeBased: "analytics/time-based",
        trendingKeywords: "analytics/trending-keywords",
      },
    };
  }
}
