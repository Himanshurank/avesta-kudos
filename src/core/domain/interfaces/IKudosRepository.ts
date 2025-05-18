import { GetAllKudosApiResponse } from "@/core/infrastructure/repositories/KudosRepositoryImpl";
import { Kudos } from "../entities/Kudos";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T | T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IKudosRepository {
  getAll(
    params: PaginationParams
  ): Promise<PaginatedResult<GetAllKudosApiResponse>>;
  filter(
    params: PaginationParams
  ): Promise<PaginatedResult<GetAllKudosApiResponse>>;
  getById(id: number): Promise<Kudos | null>;
  getByTeam(
    teamId: number,
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>>;
  getByCategory(
    categoryId: number,
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>>;
  getByUser(
    userId: number,
    type: "received" | "sent",
    params: PaginationParams
  ): Promise<PaginatedResult<Kudos>>;
  create(kudos: Omit<Kudos, "id" | "createdAt" | "updatedAt">): Promise<Kudos>;
  update(id: number, kudos: Partial<Kudos>): Promise<Kudos>;
  delete(id: number): Promise<void>;
}
