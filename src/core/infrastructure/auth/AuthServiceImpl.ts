import { IAuthService } from "../../domain/interfaces/IAuthService";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../repositories/AuthRepository";
import { AuthResponse } from "../../domain/valueObjects/AuthResponse";
import { IStorageService } from "../../shared/interface/IStorageService";

export class AuthServiceImpl implements IAuthService {
  // Using constants for storage keys to ensure consistency
  private readonly TOKEN_KEY = "auth_token"; // This will be stored in cookies
  private readonly USER_KEY = "user_data"; // This will be stored in localStorage

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly storageService: IStorageService
  ) {}

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }> {
    try {
      return await this.authRepository.register(email, password, name);
    } catch (error) {
      if (error instanceof Error) {
        return { message: `Registration failed: ${error.message}` };
      }
      return { message: "Registration failed: Unknown error occurred" };
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.authRepository.login(email, password);

      // Store the token
      this.storageService.setItem(this.TOKEN_KEY, response.data.token);

      // Store the complete user data if available
      if (response.data.user) {
        this.storageService.setItem(
          this.USER_KEY,
          JSON.stringify(response.data.user)
        );
      }

      return response;
    } catch (error) {
      // Instead of throwing an error, return a failure response with the error message
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        data: { token: "", user: null },
        success: false,
        error: errorMessage,
      };
    }
  }

  async logout(): Promise<{ message: string }> {
    try {
      // Clear both token and user data
      this.storageService.removeItem(this.TOKEN_KEY);
      this.storageService.removeItem(this.USER_KEY);
      return await this.authRepository.logout();
    } catch (error) {
      if (error instanceof Error) {
        return { message: `Logout failed: ${error.message}` };
      }
      return { message: "Logout failed: Unknown error occurred" };
    }
  }

  async resetPasswordRequest(email: string): Promise<{ message: string }> {
    try {
      return await this.authRepository.resetPasswordRequest(email);
    } catch (error) {
      if (error instanceof Error) {
        return { message: `Password reset request failed: ${error.message}` };
      }
      return {
        message: "Password reset request failed: Unknown error occurred",
      };
    }
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    try {
      return await this.authRepository.resetPassword(token, password);
    } catch (error) {
      if (error instanceof Error) {
        return { message: `Password reset failed: ${error.message}` };
      }
      return { message: "Password reset failed: Unknown error occurred" };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a valid token in cookies
      const token = this.storageService.getItem(this.TOKEN_KEY);
      if (!token) {
        return null;
      }

      // Try to get user from localStorage if available (client-side only)
      const userData = this.storageService.getItem(this.USER_KEY);
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Create a proper User instance from the parsed data
          if (parsedUser && parsedUser.id) {
            return new User(
              parsedUser.id,
              parsedUser.email,
              parsedUser.name,
              parsedUser.roles || [],
              parsedUser.approvalStatus,
              parsedUser.createdAt
                ? new Date(parsedUser.createdAt)
                : new Date(),
              parsedUser.updatedAt
                ? new Date(parsedUser.updatedAt)
                : new Date(),
              parsedUser.team
            );
          }
        } catch (e) {
          console.error("Error parsing stored user data:", e);
        }
      }

      // If no valid user in localStorage but we have a token, fetch from API
      // This works on both client and server side
      const user = await this.authRepository.getCurrentUser();

      // Update stored user data if successful (client-side only)
      if (user) {
        this.storageService.setItem(this.USER_KEY, JSON.stringify(user));
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to get current user: ${error.message}`);
      } else {
        console.error("Failed to get current user: Unknown error occurred");
      }
      return null;
    }
  }
}
