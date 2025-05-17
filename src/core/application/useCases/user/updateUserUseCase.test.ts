import { describe, it, expect, beforeEach } from "@jest/globals";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UserRepositoryStub } from "../../../tests/UserRepositoryStub";
import { User } from "../../../domain/entities/User";

describe("UpdateUserUseCase", () => {
  // System under test
  let updateUserUseCase: UpdateUserUseCase;

  // Test doubles
  let userRepositoryStub: UserRepositoryStub;

  // Test data
  const userId = 1;
  const originalUser = new User(
    userId,
    "original@example.com",
    "Original User",
    [{ id: 1, name: "USER" }],
    "Approved",
    new Date(),
    new Date()
  );

  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();

    // Create the system under test with test doubles
    updateUserUseCase = new UpdateUserUseCase(userRepositoryStub);
  });

  it("should update a user successfully with name change", async () => {
    // Arrange
    const updateData = { name: "Updated User Name" };
    const updatedUser = new User(
      userId,
      originalUser.email,
      updateData.name,
      originalUser.roles,
      originalUser.approvalStatus,
      originalUser.createdAt,
      new Date()
    );

    userRepositoryStub.updateUser = jest.fn().mockImplementation(() => {
      return Promise.resolve(updatedUser);
    });

    // Act
    const result = await updateUserUseCase.execute(userId, updateData);

    // Assert
    expect(result).toEqual(updatedUser);
    expect(result.id).toBe(userId);
    expect(result.name).toBe(updateData.name);
    expect(result.email).toBe(originalUser.email); // Email remains unchanged

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.updateUser).toHaveBeenCalledWith(
      userId,
      updateData
    );
  });

  it("should update a user successfully with email change", async () => {
    // Arrange
    const updateData = { email: "newemail@example.com" };
    const updatedUser = new User(
      userId,
      updateData.email,
      originalUser.name,
      originalUser.roles,
      originalUser.approvalStatus,
      originalUser.createdAt,
      new Date()
    );

    userRepositoryStub.updateUser = jest.fn().mockImplementation(() => {
      return Promise.resolve(updatedUser);
    });

    // Act
    const result = await updateUserUseCase.execute(userId, updateData);

    // Assert
    expect(result).toEqual(updatedUser);
    expect(result.email).toBe(updateData.email);
    expect(result.name).toBe(originalUser.name); // Name remains unchanged

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.updateUser).toHaveBeenCalledWith(
      userId,
      updateData
    );
  });

  it("should update a user successfully with multiple field changes", async () => {
    // Arrange
    const updateData = {
      name: "Completely Updated User",
      email: "completely.updated@example.com",
      roleIds: 2,
    };

    const updatedUser = new User(
      userId,
      updateData.email,
      updateData.name,
      [{ id: 2, name: "ADMIN" }],
      originalUser.approvalStatus,
      originalUser.createdAt,
      new Date()
    );

    userRepositoryStub.updateUser = jest.fn().mockImplementation(() => {
      return Promise.resolve(updatedUser);
    });

    // Act
    const result = await updateUserUseCase.execute(userId, updateData);

    // Assert
    expect(result).toEqual(updatedUser);
    expect(result.name).toBe(updateData.name);
    expect(result.email).toBe(updateData.email);
    expect(result.roles[0].id).toBe(2);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.updateUser).toHaveBeenCalledWith(
      userId,
      updateData
    );
  });

  it("should handle user not found error", async () => {
    // Arrange
    const nonExistentUserId = 9999;
    const updateData = { name: "Will Not Update" };
    const errorMessage = "User not found";

    userRepositoryStub.updateUser = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act and Assert
    await expect(
      updateUserUseCase.execute(nonExistentUserId, updateData)
    ).rejects.toThrow(errorMessage);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.updateUser).toHaveBeenCalledWith(
      nonExistentUserId,
      updateData
    );
  });

  it("should handle validation errors", async () => {
    // Arrange
    const invalidUpdateData = { email: "invalid-email" };
    const errorMessage = "Invalid email format";

    userRepositoryStub.updateUser = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act and Assert
    await expect(
      updateUserUseCase.execute(userId, invalidUpdateData)
    ).rejects.toThrow(errorMessage);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.updateUser).toHaveBeenCalledWith(
      userId,
      invalidUpdateData
    );
  });
});
