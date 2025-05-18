import { IAnalyticsRepository } from "../../../domain/interfaces/IAnalyticsRepository";
import { TimeBasedResponse } from "../../../domain/valueObjects/AnalyticsTypes";

export interface GetTimeBasedAnalysisParams {
  period: "weekly" | "monthly" | "quarterly" | "yearly";
  startDate?: string;
  endDate?: string;
  teamName?: string;
}

export class GetTimeBasedAnalysisUseCase {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async execute(
    params: GetTimeBasedAnalysisParams
  ): Promise<TimeBasedResponse> {
    try {
      return await this.analyticsRepository.getTimeBasedAnalysis(params);
    } catch (error) {
      throw error;
    }
  }
}
