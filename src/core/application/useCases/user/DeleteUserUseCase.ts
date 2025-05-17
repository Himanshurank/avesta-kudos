import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    return this.userRepository.deleteUser(id);
  }
}
