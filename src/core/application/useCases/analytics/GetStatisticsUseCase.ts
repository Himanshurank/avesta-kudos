import { IAnalyticsRepository } from "../../../domain/interfaces/IAnalyticsRepository";
import { StatisticsResponse } from "../../../domain/valueObjects/AnalyticsTypes";

export interface GetStatisticsParams {
  startDate?: string;
  endDate?: string;
  teamName?: string;
}

export class GetStatisticsUseCase {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async execute(params: GetStatisticsParams): Promise<StatisticsResponse> {
    try {
      return await this.analyticsRepository.getStatistics(params);
    } catch (error) {
      throw error;
    }
  }
}
