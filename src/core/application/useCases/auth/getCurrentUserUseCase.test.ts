import { describe, it, expect, beforeEach } from "@jest/globals";
import { GetCurrentUserUseCase } from "./GetCurrentUserUseCase";
import { AuthServiceStub } from "@/core/tests/AuthServiceStub";
import { User } from "../../../domain/entities/User";

describe("GetCurrentUserUseCase", () => {
  // System under test
  let getCurrentUserUseCase: GetCurrentUserUseCase;

  // Test doubles
  let authServiceStub: AuthServiceStub;

  const mockUser = new User(
    1,
    "user@example.com", // Instead of newUserData.email
    "Test User", // Instead of newUserData.name
    [{ id: 1, name: "USER" }],
    "Pending",
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
    authServiceStub = new AuthServiceStub();

    // Create the system under test with test doubles
    getCurrentUserUseCase = new GetCurrentUserUseCase(authServiceStub);
  });

  it("should return the current user when authenticated", async () => {
    // Arrange
    authServiceStub.getCurrentUserReturnValue = mockUser;

    // Act
    const result = await getCurrentUserUseCase.execute();

    // Assert
    expect(result).toEqual(mockUser);
    expect(authServiceStub.getCurrentUserWasCalled).toBe(true);
  });

  it("should return null when no user is authenticated", async () => {
    // Arrange
    authServiceStub.getCurrentUserReturnValue = null;

    // Act
    const result = await getCurrentUserUseCase.execute();

    // Assert
    expect(result).toBeNull();
    expect(authServiceStub.getCurrentUserWasCalled).toBe(true);
  });
});
