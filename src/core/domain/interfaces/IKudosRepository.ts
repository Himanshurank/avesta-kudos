import { Kudos } from "../entities/Kudos";

export interface KudosFilter {
  teamId?: number;
  categoryId?: number;
  recipientId?: number;
  createdById?: number;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  sort?: string;
  order?: "asc" | "desc";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}

export interface IKudosRepository {
  getAll(
    filter: KudosFilter,
    page?: number,
    limit?: number
  ): Promise<PaginatedResult<Kudos>>;
  getById(id: number): Promise<Kudos | null>;
  create(kudos: Partial<Kudos>): Promise<Kudos>;
  update(id: number, kudos: Partial<Kudos>): Promise<Kudos>;
  delete(id: number): Promise<void>;
}
