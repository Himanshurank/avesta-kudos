import { User } from "../../../domain/entities/User";
import {
  CreateUserDTO,
  IUserRepository,
} from "../../../domain/interfaces/IUserRepository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    return this.userRepository.createUser(data);
  }
}
