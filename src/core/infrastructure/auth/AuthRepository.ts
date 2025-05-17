import { BaseRepository } from "../../shared/repositories/BaseRepository";
import { User } from "../../domain/entities/User";
import { AuthResponse } from "../../domain/valueObjects/AuthResponse";

export class AuthRepository extends BaseRepository {
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }> {
    const path = this.getApiPath("auth").register;
    return this.httpService.post<{ message: string }>({
      path,
      body: { email, password, name },
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const path = this.getApiPath("auth").login;
    return this.httpService.post<AuthResponse>({
      path,
      body: { email, password },
    });
  }

  async logout(): Promise<{ message: string }> {
    const path = this.getApiPath("auth").logout;
    return this.httpService.post<{ message: string }>({
      path,
      body: {},
    });
  }

  async resetPasswordRequest(email: string): Promise<{ message: string }> {
    const path = this.getApiPath("auth").resetPasswordRequest;
    return this.httpService.post<{ message: string }>({
      path,
      body: { email },
    });
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    const path = this.getApiPath("auth").resetPassword;
    return this.httpService.post<{ message: string }>({
      path,
      body: { token, password },
    });
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // This is just a placeholder, as the API contract doesn't specify an endpoint
      // for retrieving the current user. In a real implementation, you'd need to
      // create such an endpoint or use another method to retrieve the user from the token.
      const path = "users/me";
      return await this.httpService.get<User>({ path });
    } catch {
      return null;
    }
  }
}
