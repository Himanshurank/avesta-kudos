import {
  Kudos,
  Creator,
  Recipient,
  Team,
  Category,
  Tag,
  Media,
} from "../../domain/entities/Kudos";
import {
  IKudosRepository,
  KudosFilter,
  PaginatedResult,
  Pagination,
} from "../../domain/interfaces/IKudosRepository";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
  pagination?: Pagination;
}

export class KudosRepositoryImpl implements IKudosRepository {
  private readonly apiBaseUrl: string = "/api";
  private readonly token: string | null = null;

  constructor() {
    // In a real implementation, we would get the token from a token provider
    this.token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  }

  private async fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    const data = await response.json();
    return data as ApiResponse<T>;
  }

  async getAll(
    filter: KudosFilter = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Kudos>> {
    const queryParams = new URLSearchParams();

    // Add page and limit
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    // Add filter parameters
    if (filter.teamId) queryParams.append("teamId", filter.teamId.toString());
    if (filter.categoryId)
      queryParams.append("categoryId", filter.categoryId.toString());
    if (filter.recipientId)
      queryParams.append("recipientId", filter.recipientId.toString());
    if (filter.createdById)
      queryParams.append("createdById", filter.createdById.toString());
    if (filter.search) queryParams.append("search", filter.search);
    if (filter.startDate)
      queryParams.append("startDate", filter.startDate.toISOString());
    if (filter.endDate)
      queryParams.append("endDate", filter.endDate.toISOString());
    if (filter.sort) queryParams.append("sort", filter.sort);
    if (filter.order) queryParams.append("order", filter.order);

    const response = await this.fetchApi<Kudos[]>(
      `/kudos?${queryParams.toString()}`
    );

    if (!response.success) {
      throw new Error(response.error?.message || "Failed to fetch kudos");
    }

    const kudos = response.data.map(this.mapResponseToKudos);

    return {
      data: kudos,
      pagination: response.pagination!,
    };
  }

  async getById(id: number): Promise<Kudos | null> {
    const response = await this.fetchApi<any>(`/kudos/${id}`);

    if (!response.success) {
      if (response.error?.code === "NOT_FOUND") {
        return null;
      }
      throw new Error(response.error?.message || "Failed to fetch kudos");
    }

    return this.mapResponseToKudos(response.data);
  }

  async create(kudosData: Partial<Kudos>): Promise<Kudos> {
    const payload = {
      message: kudosData.message,
      recipientIds: kudosData.recipients?.map((r) => r.id),
      teamId: kudosData.team?.id,
      categoryId: kudosData.category?.id,
      tagIds: kudosData.tags?.map((t) => t.id),
      mediaIds: kudosData.media?.map((m) => m.id),
    };

    const response = await this.fetchApi<any>("/kudos", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.error?.message || "Failed to create kudos");
    }

    return this.mapResponseToKudos(response.data);
  }

  async update(id: number, kudosData: Partial<Kudos>): Promise<Kudos> {
    const payload = {
      message: kudosData.message,
      recipientIds: kudosData.recipients?.map((r) => r.id),
      teamId: kudosData.team?.id,
      categoryId: kudosData.category?.id,
      tagIds: kudosData.tags?.map((t) => t.id),
      mediaIds: kudosData.media?.map((m) => m.id),
    };

    const response = await this.fetchApi<any>(`/kudos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.error?.message || "Failed to update kudos");
    }

    return this.mapResponseToKudos(response.data);
  }

  async delete(id: number): Promise<void> {
    const response = await this.fetchApi<any>(`/kudos/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.error?.message || "Failed to delete kudos");
    }
  }

  private mapResponseToKudos(data: any): Kudos {
    return new Kudos(
      data.id,
      data.message,
      data.createdBy,
      data.recipients,
      data.team,
      data.category,
      data.tags || [],
      data.media || [],
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }
}
