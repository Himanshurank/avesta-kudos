import { GetAllKudosApiResponse } from "@/core/infrastructure/repositories/KudosRepositoryImpl";

import {
  IKudosRepository,
  PaginatedResult,
  PaginationParams,
} from "../../../domain/interfaces/IKudosRepository";

export interface FilterKudosParams extends PaginationParams {
  teamId?: number;
  categoryId?: number;
  userId?: number;
  type?: "received" | "sent";
  search?: string;
}

export class FilterKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(
    params: FilterKudosParams = { page: 1, limit: 10 }
  ): Promise<PaginatedResult<GetAllKudosApiResponse>> {
    return this.kudosRepository.filter(params);
  }
}
