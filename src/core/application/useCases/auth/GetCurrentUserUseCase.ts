import { IAuthService } from "../../../domain/interfaces/IAuthService";
import { User } from "../../../domain/entities/User";

export class GetCurrentUserUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(): Promise<User | null> {
    return this.authService.getCurrentUser();
  }
}
