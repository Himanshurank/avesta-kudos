import { describe, it, expect, beforeEach } from "@jest/globals";
import { ResetPasswordRequestUseCase } from "./ResetPasswordRequestUseCase";
import { AuthServiceStub } from "@/core/tests/AuthServiceStub";

describe("ResetPasswordRequestUseCase", () => {
  // System under test
  let resetPasswordRequestUseCase: ResetPasswordRequestUseCase;

  // Test doubles
  let authServiceStub: AuthServiceStub;

  // Test data
  const validEmail = "test@example.com";
  const invalidEmail = "invalid@example.com";

  // Success response
  const successResponse = {
    message: "Password reset instructions sent to your email",
  };

  // Error response data
  const errorMessage = "User not found";

  beforeEach(() => {
    // Create fresh test doubles before each test
    authServiceStub = new AuthServiceStub();

    // Create the system under test with test doubles
    resetPasswordRequestUseCase = new ResetPasswordRequestUseCase(
      authServiceStub
    );
  });

  it("should successfully request password reset with valid email", async () => {
    // Arrange
    authServiceStub.resetPasswordRequestReturnValue = successResponse;

    // Act
    const result = await resetPasswordRequestUseCase.execute(validEmail);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe(successResponse.message);

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.resetPasswordRequestWasCalled).toBe(true);
    expect(authServiceStub.resetPasswordRequestWasCalledWith).toEqual({
      email: validEmail,
    });
  });

  it("should handle errors when requesting password reset", async () => {
    // Arrange
    authServiceStub.resetPasswordRequest = async (email) => {
      authServiceStub.resetPasswordRequestWasCalled = true;
      authServiceStub.resetPasswordRequestWasCalledWith = { email };
      throw new Error(errorMessage);
    };

    // Act
    const result = await resetPasswordRequestUseCase.execute(invalidEmail);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe(errorMessage);

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.resetPasswordRequestWasCalled).toBe(true);
    expect(authServiceStub.resetPasswordRequestWasCalledWith).toEqual({
      email: invalidEmail,
    });
  });

  it("should handle unknown errors and provide default error message", async () => {
    // Arrange
    authServiceStub.resetPasswordRequest = async (email) => {
      authServiceStub.resetPasswordRequestWasCalled = true;
      authServiceStub.resetPasswordRequestWasCalledWith = { email };
      throw "Some non-Error type exception";
    };

    // Act
    const result = await resetPasswordRequestUseCase.execute(validEmail);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Unknown error occurred");

    // Verify the auth service was called with correct parameters
    expect(authServiceStub.resetPasswordRequestWasCalled).toBe(true);
    expect(authServiceStub.resetPasswordRequestWasCalledWith).toEqual({
      email: validEmail,
    });
  });
});
