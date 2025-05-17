import { Kudos } from "../../../domain/entities/Kudos";
import {
  IKudosRepository,
  KudosFilter,
  PaginatedResult,
} from "../../../domain/interfaces/IKudosRepository";

export class GetKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository) {}

  async execute(
    filter: KudosFilter = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Kudos>> {
    return this.kudosRepository.getAll(filter, page, limit);
  }
}
