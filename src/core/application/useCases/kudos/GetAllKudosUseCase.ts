import { Kudos } from "../../../domain/entities/Kudos";
import {
  IKudosRepository,
  PaginatedResult,
  PaginationParams,
} from "../../../domain/interfaces/IKudosRepository";

export class GetAllKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(
    params: PaginationParams = { page: 1, limit: 10 }
  ): Promise<PaginatedResult<Kudos>> {
    return this.kudosRepository.getAll(params);
  }
}
