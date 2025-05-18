import { IAnalyticsRepository } from "../../domain/interfaces/IAnalyticsRepository";
import {
  StatisticsResponse,
  TimeBasedResponse,
  TrendingKeywordsResponse,
} from "../../domain/valueObjects/AnalyticsTypes";
import { BaseRepository } from "../../shared/repositories/BaseRepository";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export class AnalyticsRepositoryImpl
  extends BaseRepository
  implements IAnalyticsRepository
{
  async getStatistics(params: {
    startDate?: string;
    endDate?: string;
    teamName?: string;
  }): Promise<StatisticsResponse> {
    const path = this.getApiPath("analytics").statistics;

    const response = await this.httpService.get<
      ApiResponse<StatisticsResponse>
    >({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    return response.data;
  }

  async getTimeBasedAnalysis(params: {
    period: "weekly" | "monthly" | "quarterly" | "yearly";
    startDate?: string;
    endDate?: string;
    teamName?: string;
  }): Promise<TimeBasedResponse> {
    const path = this.getApiPath("analytics").timeBased;

    const response = await this.httpService.get<ApiResponse<TimeBasedResponse>>(
      {
        path,
        queryParams: params as Record<string, string | number | boolean>,
      }
    );

    return response.data;
  }

  async getTrendingKeywords(params: {
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<TrendingKeywordsResponse> {
    const path = this.getApiPath("analytics").trendingKeywords;

    const response = await this.httpService.get<
      ApiResponse<TrendingKeywordsResponse>
    >({
      path,
      queryParams: params as Record<string, string | number | boolean>,
    });

    return response.data;
  }
}
