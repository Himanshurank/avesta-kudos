import {
  StatisticsResponse,
  TimeBasedResponse,
  TrendingKeywordsResponse,
} from "../valueObjects/AnalyticsTypes";

export interface IAnalyticsRepository {
  getStatistics(params: {
    startDate?: string;
    endDate?: string;
    teamName?: string;
  }): Promise<StatisticsResponse>;

  getTimeBasedAnalysis(params: {
    period: "weekly" | "monthly" | "quarterly" | "yearly";
    startDate?: string;
    endDate?: string;
    teamName?: string;
  }): Promise<TimeBasedResponse>;

  getTrendingKeywords(params: {
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<TrendingKeywordsResponse>;
}
