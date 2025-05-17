import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { AuthResponse } from "../../../domain/valueObjects/AuthResponse";

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(email: string, password: string): Promise<AuthResponse> {
    return this.authService.login(email, password);
  }
}
