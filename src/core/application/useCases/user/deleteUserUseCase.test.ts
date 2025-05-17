import { describe, it, expect, beforeEach } from "@jest/globals";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { UserRepositoryStub } from "../../../tests/UserRepositoryStub";

describe("DeleteUserUseCase", () => {
  // System under test
  let deleteUserUseCase: DeleteUserUseCase;

  // Test doubles
  let userRepositoryStub: UserRepositoryStub;

  // Test data
  const userId = 1;
  const successResponse = { message: "User deleted successfully" };

  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();

    // Create the system under test with test doubles
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryStub);
  });

  it("should successfully delete a user", async () => {
    // Arrange
    userRepositoryStub.deleteUser = jest.fn().mockImplementation(() => {
      return Promise.resolve(successResponse);
    });

    // Act
    const result = await deleteUserUseCase.execute(userId);

    // Assert
    expect(result).toEqual(successResponse);
    expect(result.message).toBe(successResponse.message);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.deleteUser).toHaveBeenCalledWith(userId);
  });

  it("should handle errors when deleting a user", async () => {
    // Arrange
    const errorMessage = "User not found";
    userRepositoryStub.deleteUser = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act and Assert
    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(
      errorMessage
    );

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.deleteUser).toHaveBeenCalledWith(userId);
  });

  it("should handle different user IDs", async () => {
    // Arrange
    const differentUserId = 999;
    userRepositoryStub.deleteUser = jest.fn().mockImplementation((id) => {
      return Promise.resolve({ message: `User ${id} deleted successfully` });
    });

    // Act
    const result = await deleteUserUseCase.execute(differentUserId);

    // Assert
    expect(result.message).toBe(`User ${differentUserId} deleted successfully`);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.deleteUser).toHaveBeenCalledWith(differentUserId);
  });
});
