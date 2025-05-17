import { User } from "../../../domain/entities/User";
import {
  CreateUserDTO,
  IUserRepository,
} from "../../../domain/interfaces/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number, data: Partial<CreateUserDTO>): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }
}
