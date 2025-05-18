import { IAnalyticsRepository } from "../../../domain/interfaces/IAnalyticsRepository";
import { TrendingKeywordsResponse } from "../../../domain/valueObjects/AnalyticsTypes";

export interface GetTrendingKeywordsParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export class GetTrendingKeywordsUseCase {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async execute(
    params: GetTrendingKeywordsParams
  ): Promise<TrendingKeywordsResponse> {
    try {
      return await this.analyticsRepository.getTrendingKeywords(params);
    } catch (error) {
      throw error;
    }
  }
}
