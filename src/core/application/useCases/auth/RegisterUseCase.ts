import { IAuthService } from "../../../domain/interfaces/IAuthService";

export class RegisterUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }> {
    return this.authService.register(email, password, name);
  }
}
