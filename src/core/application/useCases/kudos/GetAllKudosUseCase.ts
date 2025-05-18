import { GetAllKudosApiResponse } from "@/core/infrastructure/repositories/KudosRepositoryImpl";

import {
  IKudosRepository,
  PaginatedResult,
  PaginationParams,
} from "../../../domain/interfaces/IKudosRepository";

export class GetAllKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(
    params: PaginationParams = { page: 1, limit: 10 }
  ): Promise<PaginatedResult<GetAllKudosApiResponse>> {
    return this.kudosRepository.getAll(params);
  }
}
