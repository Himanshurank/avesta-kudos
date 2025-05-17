import { IConfigService } from "../../shared/interface/IConfigService";
import { IHttpService } from "../../shared/interface/IHttpService";
import { IStorageService } from "../../shared/interface/IStorageService";
import { IAuthService } from "../../domain/interfaces/IAuthService";

import { ConfigService } from "../../shared/services/ConfigService";
import { HttpService } from "../../shared/services/HttpService";
import { StorageService } from "../storage/StorageService";
import { AuthRepository } from "../auth/AuthRepository";
import { AuthService } from "../auth/AuthService";

import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/useCases/auth/RegisterUseCase";
import { GetCurrentUserUseCase } from "../../application/useCases/auth/GetCurrentUserUseCase";
import { ResetPasswordRequestUseCase } from "../../application/useCases/auth/ResetPasswordRequestUseCase";

// Create service instances
const configService: IConfigService = new ConfigService();
const storageService: IStorageService = new StorageService();
const httpService: IHttpService = new HttpService(
  configService,
  storageService
);

// Create repositories
const authRepository = new AuthRepository(httpService, configService);

// Create services
const authService: IAuthService = new AuthService(
  authRepository,
  storageService
);

// Create use cases
const loginUseCase = new LoginUseCase(authService);
const registerUseCase = new RegisterUseCase(authService);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authService);
const resetPasswordRequestUseCase = new ResetPasswordRequestUseCase(
  authService
);

export const container = {
  // Services
  configService,
  httpService,
  storageService,
  authService,

  // Repositories
  authRepository,

  // Use cases
  loginUseCase,
  registerUseCase,
  getCurrentUserUseCase,
  resetPasswordRequestUseCase,
};
