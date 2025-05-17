import { IAuthService } from "../../../domain/interfaces/IAuthService";

export class ResetPasswordRequestUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.authService.resetPasswordRequest(email);
      return { success: true, message: result.message };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: errorMessage };
    }
  }
}
