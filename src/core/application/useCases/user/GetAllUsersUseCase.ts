import { User } from "../../../domain/entities/User";
import {
  IUserRepository,
  PaginationMeta,
} from "../../../domain/interfaces/IUserRepository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params?: {
    page?: number;
    limit?: number;
    roleId?: number;
    approvalStatus?: string;
  }): Promise<{ users: User[]; pagination: PaginationMeta }> {
    const response = await this.userRepository.getAllUsers(params);

    return response;
  }
}
