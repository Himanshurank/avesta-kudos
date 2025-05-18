import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ApproveRejectUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    id: number,
    data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
  ): Promise<{ message: string }> {
    // Validate data according to API contract
    if (data.approvalStatus === "Approved" && data.roleIds === undefined) {
      throw new Error("roleIds is required when approving a user");
    }

    return this.userRepository.approveRejectUser(id, data);
  }
}
