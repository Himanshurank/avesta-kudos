import { IKudosRepository } from "../../domain/interfaces/IKudosRepository";
import { KudosRepositoryImpl } from "../../infrastructure/repositories/KudosRepositoryImpl";
import { GetAllKudosUseCase } from "../../application/useCases/kudos/GetAllKudosUseCase";
import { FilterKudosUseCase } from "../../application/useCases/kudos/FilterKudosUseCase";
import { HttpService } from "../services/HttpService";
import { ConfigService } from "../services/ConfigService";
import { HybridStorageService } from "../services/HybridStorageService";

// Use a more specific type for nookies context options
type NookiesContext = Record<string, unknown> | null | undefined;

/**
 * Creates kudos services with the specified dependencies.
 * For server-side rendering, pass a token to use for authentication.
 *
 * @param serverSideToken Optional token for server-side authentication
 * @param context Optional server context for cookie operations
 */
export function createKudosServices(
  serverSideToken?: string,
  context?: NookiesContext
) {
  // Is this running on the server?
  const isServer = typeof window === "undefined";

  // Services
  const configService = new ConfigService();

  const storageService = new HybridStorageService(context);

  if (serverSideToken && isServer) {
    storageService.setItem("auth_token", serverSideToken);
  }

  const httpService = new HttpService(configService, storageService);

  const kudosRepository: IKudosRepository = new KudosRepositoryImpl(
    httpService,
    configService
  );

  const getAllKudosUseCase = new GetAllKudosUseCase(kudosRepository);
  const filterKudosUseCase = new FilterKudosUseCase(kudosRepository);

  return {
    kudosRepository,
    getAllKudosUseCase,
    filterKudosUseCase,
  };
}

export const kudosServices = createKudosServices();
