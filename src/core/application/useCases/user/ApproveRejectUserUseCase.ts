import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ApproveRejectUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    id: number,
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
  ): Promise<{ message: string }> {
    return this.userRepository.approveRejectUser(id, data);
  }
}
