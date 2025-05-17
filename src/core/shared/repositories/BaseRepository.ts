import { IHttpService } from "../interface/IHttpService";
import { IConfigService, ApiPaths } from "../interface/IConfigService";

export abstract class BaseRepository {
  constructor(
    protected readonly httpService: IHttpService,
    protected readonly configService: IConfigService
  ) {}

  protected getApiPath<K extends keyof ApiPaths>(path: K): ApiPaths[K] {
    return this.configService.getApiPaths()[path];
  }
}
