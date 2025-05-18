import { describe, it, expect, beforeEach } from "@jest/globals";
import { LoginUseCase } from "./LoginUseCase";
import { User } from "../../../domain/entities/User";
import { AuthResponse } from "../../../domain/valueObjects/AuthResponse";
import { AuthServiceStub } from "@/core/tests/AuthServiceStub";

describe("LoginUseCase", () => {
  // System under test
  let loginUseCase: LoginUseCase;

  // Test doubles
  let authServiceStub: AuthServiceStub;

  // Test data
  const validEmail = "test@example.com";
  const validPassword = "Password123";
  const invalidEmail = "invalid@example.com";
  const invalidPassword = "wrongpassword";

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
  // Success response
  const successResponse: AuthResponse = {
    data: {
      token: "mock-jwt-token",
      user: mockUser,
    },
    success: true,
  };

  // Error response
  const errorResponse: AuthResponse = {
    data: {
      token: "",
      user: null,
    },
    success: false,
    error: "Invalid credentials",
  };

  beforeEach(() => {
    // Create fresh test doubles before each test
    authServiceStub = new AuthServiceStub();

    // Create the system under test with test doubles
    loginUseCase = new LoginUseCase(authServiceStub);
  });

  it("should successfully login with valid credentials", async () => {
    // Arrange
    authServiceStub.loginReturnValue = successResponse;

    // Act
    const result = await loginUseCase.execute(validEmail, validPassword);

    // Assert
    expect(result).toEqual(successResponse);
    expect(result.success).toBe(true);
    expect(result.data.token).toBe("mock-jwt-token");
    expect(result.data.user).toEqual(mockUser);

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.loginWasCalledWith).toEqual({
      email: validEmail,
      password: validPassword,
    });
  });

  it("should return error response with invalid credentials", async () => {
    // Arrange
    authServiceStub.loginReturnValue = errorResponse;

    // Act
    const result = await loginUseCase.execute(invalidEmail, invalidPassword);

    // Assert
    expect(result).toEqual(errorResponse);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid credentials");
    expect(result.data.user).toBeNull();

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.loginWasCalledWith).toEqual({
      email: invalidEmail,
      password: invalidPassword,
    });
  });

  it("should pass the credentials to the auth service", async () => {
    // Arrange
    authServiceStub.loginReturnValue = successResponse;

    // Act
    await loginUseCase.execute(validEmail, validPassword);

    // Assert
    expect(authServiceStub.loginWasCalled).toBe(true);
    expect(authServiceStub.loginWasCalledWith.email).toBe(validEmail);
    expect(authServiceStub.loginWasCalledWith.password).toBe(validPassword);
  });
});
