import { Kudos } from "../../domain/entities/Kudos";
import {
  IKudosRepository,
  PaginatedResult,
  PaginationParams,
} from "../../domain/interfaces/IKudosRepository";
import { BaseRepository } from "../../shared/repositories/BaseRepository";

interface ApiKudosResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface KudosApiData {
  id: number;
  message: string;
  createdBy: {
    id: number;
    name: string;
  };
  recipients: Array<{
    id: number;
    name: string;
  }>;
  team: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export class KudosRepositoryImpl
  extends BaseRepository
  implements IKudosRepository
{
  async getAll(params: PaginationParams): Promise<PaginatedResult<Kudos>> {
    const path = this.getApiPath("kudos").getAll;

    const response = await this.httpService.get<
      ApiKudosResponse<{ kudos: KudosApiData[] }>
    >({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    const kudosData = response.data.kudos || [];

    return {
      data: kudosData.map((kudos) => this.mapKudosResponse(kudos)),
      pagination: response.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: kudosData.length,
        pages: Math.ceil(kudosData.length / (params.limit || 10)),
      },
    };
  }

  async getById(id: number): Promise<Kudos | null> {
    try {
      const path = this.getApiPath("kudos").getById(id);

      const response = await this.httpService.get<
        ApiKudosResponse<{ kudos: KudosApiData }>
      >({
        path,
      });

      return this.mapKudosResponse(response.data.kudos);
    } catch (error) {
      if ((error as Error).message.includes("NOT_FOUND")) {
        return null;
      }
      throw error;
    }
  }

  async getByTeam(
    teamId: number,
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>> {
    const path = `kudos/team/${teamId}`;

    const response = await this.httpService.get<
      ApiKudosResponse<{ kudos: KudosApiData[] }>
    >({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    const kudosData = response.data.kudos || [];

    return {
      data: kudosData.map((kudos) => this.mapKudosResponse(kudos)),
      pagination: response.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: kudosData.length,
        pages: Math.ceil(kudosData.length / (params.limit || 10)),
      },
    };
  }

  async getByCategory(
    categoryId: number,
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>> {
    const path = `kudos/category/${categoryId}`;

    const response = await this.httpService.get<
      ApiKudosResponse<{ kudos: KudosApiData[] }>
    >({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    const kudosData = response.data.kudos || [];

    return {
      data: kudosData.map((kudos) => this.mapKudosResponse(kudos)),
      pagination: response.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: kudosData.length,
        pages: Math.ceil(kudosData.length / (params.limit || 10)),
      },
    };
  }

  async getByUser(
    userId: number,
    type: "received" | "sent",
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>> {
    const path = `kudos/user/${userId}`;

    const queryParams = {
      ...params,
      type,
    };

    const response = await this.httpService.get<
      ApiKudosResponse<{ kudos: KudosApiData[] }>
    >({
      path,
      queryParams: queryParams as Record<string, string | number | boolean>,
    });

    const kudosData = response.data.kudos || [];

    return {
      data: kudosData.map((kudos) => this.mapKudosResponse(kudos)),
      pagination: response.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: kudosData.length,
        pages: Math.ceil(kudosData.length / (params.limit || 10)),
      },
    };
  }

  async create(
    kudos: Omit<Kudos, "id" | "createdAt" | "updatedAt">
  ): Promise<Kudos> {
    const path = this.getApiPath("kudos").create;

    const body = {
      message: kudos.message,
      recipientIds: kudos.recipients.map((r) => r.id),
      teamId: kudos.team.id,
      categoryId: kudos.category.id,
    };

    const response = await this.httpService.post<
      ApiKudosResponse<{ kudos: KudosApiData }>
    >({
      path,
      body: body as Record<string, unknown>,
    });

    return this.mapKudosResponse(response.data.kudos);
  }

  async update(id: number, kudos: Partial<Kudos>): Promise<Kudos> {
    const path = this.getApiPath("kudos").update(id);

    const body: Record<string, unknown> = {};

    if (kudos.message) body.message = kudos.message;
    if (kudos.recipients) body.recipientIds = kudos.recipients.map((r) => r.id);
    if (kudos.team) body.teamId = kudos.team.id;
    if (kudos.category) body.categoryId = kudos.category.id;

    const response = await this.httpService.put<
      ApiKudosResponse<{ kudos: KudosApiData }>
    >({
      path,
      body,
    });

    return this.mapKudosResponse(response.data.kudos);
  }

  async delete(id: number): Promise<void> {
    const path = this.getApiPath("kudos").delete(id);

    await this.httpService.delete<ApiKudosResponse<{ message: string }>>({
      path,
    });
  }

  private mapKudosResponse(data: KudosApiData): Kudos {
    return new Kudos(
      data.id,
      data.message,
      data.createdBy,
      data.recipients,
      data.team,
      data.category,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }
}
