import { IConfigService } from "../../shared/interface/IConfigService";
import { IHttpService } from "../../shared/interface/IHttpService";
import { IStorageService } from "../../shared/interface/IStorageService";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { ConfigService } from "../../shared/services/ConfigService";
import { HttpService } from "../../shared/services/HttpService";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/useCases/auth/RegisterUseCase";
import { GetCurrentUserUseCase } from "../../application/useCases/auth/GetCurrentUserUseCase";
import { ResetPasswordRequestUseCase } from "../../application/useCases/auth/ResetPasswordRequestUseCase";
import { CreateUserUseCase } from "../../application/useCases/user/CreateUserUseCase";
import { GetAllUsersUseCase } from "../../application/useCases/user/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../application/useCases/user/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../application/useCases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/useCases/user/DeleteUserUseCase";
import { ApproveRejectUserUseCase } from "../../application/useCases/user/ApproveRejectUserUseCase";
import { AuthRepository } from "../../infrastructure/repositories/AuthRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { AuthServiceImpl } from "../../infrastructure/auth/AuthServiceImpl";
import { StorageService } from "../services/StorageService";

// Create service instances
const configService: IConfigService = new ConfigService();
const storageService: IStorageService = new StorageService();
const httpService: IHttpService = new HttpService(
  configService,
  storageService
);

// Create repositories
const authRepository = new AuthRepository(httpService, configService);
const userRepository: IUserRepository = new UserRepository(
  httpService,
  configService
);

// Create services
const authService: IAuthService = new AuthServiceImpl(
  authRepository,
  storageService
);

// Create auth use cases
const loginUseCase = new LoginUseCase(authService);
const registerUseCase = new RegisterUseCase(authService);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authService);
const resetPasswordRequestUseCase = new ResetPasswordRequestUseCase(
  authService
);

// Create user use cases
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const approveRejectUserUseCase = new ApproveRejectUserUseCase(userRepository);

export const container = {
  // Services
  configService,
  httpService,
  storageService,
  authService,

  // Repositories
  authRepository,
  userRepository,

  // Auth use cases
  loginUseCase,
  registerUseCase,
  getCurrentUserUseCase,
  resetPasswordRequestUseCase,

  // User use cases
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  approveRejectUserUseCase,
};
