import { IAuthService } from "../domain/interfaces/IAuthService";
import { User } from "../domain/entities/User";
import { AuthResponse } from "../domain/valueObjects/AuthResponse";

/**
 * A stub implementation of IAuthService that also acts as a spy.
 * This is a combined stub/spy that allows controlling return values
 * while also recording method calls for verification.
 */
export class AuthServiceStub implements IAuthService {
  // Flags to record method calls
  loginWasCalled = false;
  registerWasCalled = false;
  logoutWasCalled = false;
  resetPasswordRequestWasCalled = false;
  resetPasswordWasCalled = false;
  getCurrentUserWasCalled = false;

  // Parameters passed to methods
  loginWasCalledWith: { email: string; password: string } = {
    email: "",
    password: "",
  };
  registerWasCalledWith: { email: string; password: string; name: string } = {
    email: "",
    password: "",
    name: "",
  };
  resetPasswordRequestWasCalledWith: { email: string } = { email: "" };
  resetPasswordWasCalledWith: { token: string; password: string } = {
    token: "",
    password: "",
  };

  // Return values that tests can configure
  loginReturnValue: AuthResponse = {
    data: {
      token: "",
      user: null,
    },
    success: false,
  };

  registerReturnValue: { message: string } = { message: "" };
  logoutReturnValue: { message: string } = { message: "" };
  resetPasswordRequestReturnValue: { message: string } = { message: "" };
  resetPasswordReturnValue: { message: string } = { message: "" };
  getCurrentUserReturnValue: User | null = null;

  // Method implementations
  async login(email: string, password: string): Promise<AuthResponse> {
    this.loginWasCalled = true;
    this.loginWasCalledWith = { email, password };
    return this.loginReturnValue;
  }

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }> {
    this.registerWasCalled = true;
    this.registerWasCalledWith = { email, password, name };
    return this.registerReturnValue;
  }

  async logout(): Promise<{ message: string }> {
    this.logoutWasCalled = true;
    return this.logoutReturnValue;
  }

  async resetPasswordRequest(email: string): Promise<{ message: string }> {
    this.resetPasswordRequestWasCalled = true;
    this.resetPasswordRequestWasCalledWith = { email };
    return this.resetPasswordRequestReturnValue;
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    this.resetPasswordWasCalled = true;
    this.resetPasswordWasCalledWith = { token, password };
    return this.resetPasswordReturnValue;
  }

  async getCurrentUser(): Promise<User | null> {
    this.getCurrentUserWasCalled = true;
    return this.getCurrentUserReturnValue;
  }
}
