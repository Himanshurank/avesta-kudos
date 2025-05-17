import { describe, it, expect, beforeEach } from "@jest/globals";
import { ApproveRejectUserUseCase } from "./ApproveRejectUserUseCase";
import { UserRepositoryStub } from "../../../tests/UserRepositoryStub";

describe("ApproveRejectUserUseCase", () => {
  // System under test
  let approveRejectUserUseCase: ApproveRejectUserUseCase;

  // Test doubles
  let userRepositoryStub: UserRepositoryStub;

  // Test data
  const userId = 1;
  const approveData = { approvalStatus: "Approved" as const };
  const rejectData = { approvalStatus: "Rejected" as const };
  const approveWithRoleData = {
    approvalStatus: "Approved" as const,
    roleIds: 2,
  };

  // Success responses
  const approveSuccessResponse = { message: "User approved successfully" };
  const rejectSuccessResponse = { message: "User rejected successfully" };

  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();

    // Create the system under test with test doubles
    approveRejectUserUseCase = new ApproveRejectUserUseCase(userRepositoryStub);
  });

  it("should successfully approve a user", async () => {
    // Arrange
    userRepositoryStub.approveRejectUserReturnValue = approveSuccessResponse;

    // Act
    const result = await approveRejectUserUseCase.execute(userId, approveData);

    // Assert
    expect(result).toEqual(approveSuccessResponse);
    expect(result.message).toBe(approveSuccessResponse.message);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.approveRejectUserWasCalled).toBe(true);
    expect(userRepositoryStub.approveRejectUserWasCalledWith).toEqual({
      id: userId,
      data: approveData,
    });
  });

  it("should successfully reject a user", async () => {
    // Arrange
    userRepositoryStub.approveRejectUserReturnValue = rejectSuccessResponse;

    // Act
    const result = await approveRejectUserUseCase.execute(userId, rejectData);

    // Assert
    expect(result).toEqual(rejectSuccessResponse);
    expect(result.message).toBe(rejectSuccessResponse.message);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.approveRejectUserWasCalled).toBe(true);
    expect(userRepositoryStub.approveRejectUserWasCalledWith).toEqual({
      id: userId,
      data: rejectData,
    });
  });

  it("should handle errors when approving or rejecting a user", async () => {
    // Arrange
    const errorMessage = "User not found";
    userRepositoryStub.approveRejectUser = async (
      id: number,
      data: { approvalStatus: "Approved" | "Rejected"; roleIds?: number }
    ) => {
      userRepositoryStub.approveRejectUserWasCalled = true;
      userRepositoryStub.approveRejectUserWasCalledWith = { id, data };
      throw new Error(errorMessage);
    };

    // Act and Assert
    await expect(
      approveRejectUserUseCase.execute(userId, approveData)
    ).rejects.toThrow(errorMessage);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.approveRejectUserWasCalled).toBe(true);
    expect(userRepositoryStub.approveRejectUserWasCalledWith).toEqual({
      id: userId,
      data: approveData,
    });
  });

  it("should pass the role ID when approving with a role", async () => {
    // Arrange
    userRepositoryStub.approveRejectUserReturnValue = approveSuccessResponse;

    // Act
    const result = await approveRejectUserUseCase.execute(
      userId,
      approveWithRoleData
    );

    // Assert
    expect(result).toEqual(approveSuccessResponse);

    // Verify the repository was called with correct parameters including roleIds
    expect(userRepositoryStub.approveRejectUserWasCalled).toBe(true);
    expect(userRepositoryStub.approveRejectUserWasCalledWith).toEqual({
      id: userId,
      data: approveWithRoleData,
    });
  });
});
