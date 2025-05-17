import { describe, it, expect, beforeEach } from "@jest/globals";
import { RegisterUseCase } from "./RegisterUseCase";
import { AuthServiceStub } from "@/core/tests/AuthServiceStub";

describe("RegisterUseCase", () => {
  // System under test
  let registerUseCase: RegisterUseCase;

  // Test doubles
  let authServiceStub: AuthServiceStub;

  // Test data
  const validEmail = "test@example.com";
  const validPassword = "Password123";
  const validName = "Test User";

  // Success response
  const successResponse = {
    message: "Registration successful",
  };

  // Error response
  const errorResponse = {
    message: "Registration failed: Email already exists",
  };

  beforeEach(() => {
    // Create fresh test doubles before each test
    authServiceStub = new AuthServiceStub();

    // Create the system under test with test doubles
    registerUseCase = new RegisterUseCase(authServiceStub);
  });

  it("should successfully register a user with valid credentials", async () => {
    // Arrange
    authServiceStub.registerReturnValue = successResponse;

    // Act
    const result = await registerUseCase.execute(
      validEmail,
      validPassword,
      validName
    );

    // Assert
    expect(result).toEqual(successResponse);
    expect(result.message).toBe("Registration successful");

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.registerWasCalled).toBe(true);
    expect(authServiceStub.registerWasCalledWith).toEqual({
      email: validEmail,
      password: validPassword,
      name: validName,
    });
  });

  it("should handle registration failure", async () => {
    // Arrange
    authServiceStub.registerReturnValue = errorResponse;

    // Act
    const result = await registerUseCase.execute(
      validEmail,
      validPassword,
      validName
    );

    // Assert
    expect(result).toEqual(errorResponse);
    expect(result.message).toBe("Registration failed: Email already exists");

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.registerWasCalledWith).toEqual({
      email: validEmail,
      password: validPassword,
      name: validName,
    });
  });

  it("should pass the user information to the auth service", async () => {
    // Arrange
    authServiceStub.registerReturnValue = successResponse;

    // Act
    await registerUseCase.execute(validEmail, validPassword, validName);

    // Assert
    expect(authServiceStub.registerWasCalled).toBe(true);
    expect(authServiceStub.registerWasCalledWith.email).toBe(validEmail);
    expect(authServiceStub.registerWasCalledWith.password).toBe(validPassword);
    expect(authServiceStub.registerWasCalledWith.name).toBe(validName);
  });
});
