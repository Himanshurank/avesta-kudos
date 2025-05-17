import { User } from "../entities/User";

export interface AuthResponse {
  data: {
    token: string;
    user: User | null;
  };
  success?: boolean;
  error?: string;
  message?: string;
}
