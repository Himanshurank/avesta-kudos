import { IKudosRepository, PaginatedResult, PaginationParams } from "@/core/domain/interfaces/IKudosRepository";
import { Kudos } from "@/core/domain/entities/Kudos";

export class GetUserKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(
    userId: number,
    type: "received" | "sent",
    params: PaginationParams = { page: 1, limit: 10 }
  ): Promise<PaginatedResult<Kudos>> {
    return this.kudosRepository.getByUser(userId, type, params);
  }
} 