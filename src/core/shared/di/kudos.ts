import { IKudosRepository } from "../../domain/interfaces/IKudosRepository";
import { KudosRepositoryImpl } from "../../infrastructure/repositories/KudosRepositoryImpl";
import { GetAllKudosUseCase } from "../../application/useCases/kudos/GetAllKudosUseCase";
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

  // Create storage service with context if available
  const storageService = new HybridStorageService(context);

  // If a server-side token is provided and we're on the server,
  // manually set the auth token in the storage service
  if (serverSideToken && isServer) {
    console.log("[createKudosServices] Setting server-side auth token");
    // Double check that token is being stored
    storageService.setItem("auth_token", serverSideToken);

    // Verify token was stored
    const storedToken = storageService.getItem("auth_token");
    console.log("[createKudosServices] Token verification:", {
      tokenProvided: !!serverSideToken,
      tokenStored: !!storedToken,
      match: serverSideToken === storedToken,
    });
  }

  // Create HTTP service
  const httpService = new HttpService(configService, storageService);

  // Repository instance
  const kudosRepository: IKudosRepository = new KudosRepositoryImpl(
    httpService,
    configService
  );

  // Use case instances
  const getAllKudosUseCase = new GetAllKudosUseCase(kudosRepository);

  return {
    kudosRepository,
    getAllKudosUseCase,
  };
}

// Default instance for client-side usage
export const kudosServices = createKudosServices();
