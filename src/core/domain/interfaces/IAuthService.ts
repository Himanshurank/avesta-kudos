import { User } from "../entities/User";
import { AuthResponse } from "../valueObjects/AuthResponse";

export interface IAuthService {
  register(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }>;
  login(email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<{ message: string }>;
  resetPasswordRequest(email: string): Promise<{ message: string }>;
  resetPassword(token: string, password: string): Promise<{ message: string }>;
  getCurrentUser(): Promise<User | null>;
}
