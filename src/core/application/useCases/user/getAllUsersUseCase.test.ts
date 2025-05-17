import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { UserRepositoryStub } from "../../../tests/UserRepositoryStub";
import { User } from "../../../domain/entities/User";

describe("GetAllUsersUseCase", () => {
  // System under test
  let getAllUsersUseCase: GetAllUsersUseCase;

  // Test doubles
  let userRepositoryStub: UserRepositoryStub;

  // Test data
  const mockUsers = [
    new User(
      1,
      "user1@example.com",
      "User One",
      [{ id: 1, name: "USER" }],
      "Approved",
      new Date(),
      new Date()
    ),
    new User(
      2,
      "user2@example.com",
      "User Two",
      [{ id: 1, name: "USER" }],
      "Pending",
      new Date(),
      new Date()
    ),
    new User(
      3,
      "admin@example.com",
      "Admin User",
      [{ id: 2, name: "ADMIN" }],
      "Approved",
      new Date(),
      new Date()
    ),
  ];

  const mockPagination = {
    total: 3,
    page: 1,
    limit: 10,
    pages: 1,
  };

  beforeEach(() => {
    // Create fresh test doubles before each test
    userRepositoryStub = new UserRepositoryStub();

    // Create the system under test with test doubles
    getAllUsersUseCase = new GetAllUsersUseCase(userRepositoryStub);
  });

  it("should get all users without parameters", async () => {
    // Arrange
    userRepositoryStub.getAllUsers = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: mockUsers,
        pagination: mockPagination,
      });
    });

    // Act
    const result = await getAllUsersUseCase.execute();

    // Assert
    expect(result.users).toEqual(mockUsers);
    expect(result.pagination).toEqual(mockPagination);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.getAllUsers).toHaveBeenCalledWith(undefined);
  });

  it("should get users with pagination parameters", async () => {
    // Arrange
    const paginationParams = { page: 2, limit: 5 };
    const paginatedMockPagination = {
      ...mockPagination,
      page: 2,
      limit: 5,
    };

    userRepositoryStub.getAllUsers = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: mockUsers.slice(0, 2), // Simulate pagination
        pagination: paginatedMockPagination,
      });
    });

    // Act
    const result = await getAllUsersUseCase.execute(paginationParams);

    // Assert
    expect(result.users.length).toBe(2);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.limit).toBe(5);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.getAllUsers).toHaveBeenCalledWith(
      paginationParams
    );
  });

  it("should get users with filter parameters", async () => {
    // Arrange
    const filterParams = { roleId: 2, approvalStatus: "Approved" };

    userRepositoryStub.getAllUsers = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: [mockUsers[2]], // Only the admin user matches these filters
        pagination: {
          ...mockPagination,
          total: 1,
        },
      });
    });

    // Act
    const result = await getAllUsersUseCase.execute(filterParams);

    // Assert
    expect(result.users.length).toBe(1);
    expect(result.users[0].email).toBe("admin@example.com");
    expect(result.pagination.total).toBe(1);

    // Verify the repository was called with correct parameters
    expect(userRepositoryStub.getAllUsers).toHaveBeenCalledWith(filterParams);
  });

  it("should handle errors from the repository", async () => {
    // Arrange
    const errorMessage = "Database connection error";
    userRepositoryStub.getAllUsers = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act and Assert
    await expect(getAllUsersUseCase.execute()).rejects.toThrow(errorMessage);

    // Verify the repository was called
    expect(userRepositoryStub.getAllUsers).toHaveBeenCalled();
  });
});
