import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { UserRepositoryStub } from "../../../tests/UserRepositoryStub";
import { User } from "../../../domain/entities/User";

describe("GetUserByIdUseCase", () => {
  // System under test
  let getUserByIdUseCase: GetUserByIdUseCase;

  // Test doubles
  let userRepositoryStub: UserRepositoryStub;

  const mockUser = new User(
    1,
    "other@example.com",
    "Other User",
    [{ id: 1, name: "USER" }],
    "Approved",
    new Date(),
    new Date(),
    {
      id: 1,
      name: "Team Name",
      description: "Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();

    // Create the system under test with test doubles
    getUserByIdUseCase = new GetUserByIdUseCase(userRepositoryStub);
  });

  it("should get a user by id successfully", async () => {
    // Arrange
    userRepositoryStub.getUserById = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockUser);
    });

    // Act

    const result = await getUserByIdUseCase.execute(mockUser.id);
    expect(result).toEqual(mockUser);
    expect(result.id).toBe(mockUser.id);
    expect(result.email).toBe(mockUser.email);
    expect(result.name).toBe(mockUser.name);

    // Also update line 45 and 54
    expect(userRepositoryStub.getUserById).toHaveBeenCalledWith(mockUser.id);
  });

  it("should handle different user IDs", async () => {
    // Arrange
    const differentUserId = 999;
    const differentUser = new User(
      differentUserId,
      "other@example.com",
      "Other User",
      [{ id: 1, name: "USER" }],
      "Approved",
      new Date(),
      new Date(),
      {
        id: 1,
        name: "Team Name",
        description: "Description",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    userRepositoryStub.getUserById = jest.fn().mockImplementation(() => {
      return Promise.resolve(differentUser);
    });

    // Act
    const result = await getUserByIdUseCase.execute(differentUserId);

    // Assert
    expect(result).toEqual(differentUser);
    expect(result.id).toBe(differentUserId);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.getUserById).toHaveBeenCalledWith(
      differentUserId
    );
  });

  it("should handle user not found error", async () => {
    // Arrange
    const nonExistentUserId = 9999;
    const errorMessage = "User not found";

    userRepositoryStub.getUserById = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act and Assert
    await expect(getUserByIdUseCase.execute(nonExistentUserId)).rejects.toThrow(
      errorMessage
    );

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.getUserById).toHaveBeenCalledWith(
      nonExistentUserId
    );
  });
});
