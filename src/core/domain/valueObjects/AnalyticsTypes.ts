export interface TeamData {
  teamId: number;
  teamName: string;
  period: string;
  periodLabel: string;
  count: string;
}

export interface CategoryData {
  categoryId: number;
  categoryName: string;
  period: string;
  periodLabel: string;
  count: string;
}

export interface ReceiverData {
  userId: number;
  name: string;
  period: string;
  periodLabel: string;
  receivedCount: string;
}

export interface GiverData {
  userId: number;
  name: string;
  period: string;
  periodLabel: string;
  givenCount: string;
}

export interface TrendData {
  period: string;
  periodLabel: string;
  count: string;
}

export interface KeywordCount {
  keyword: string;
  count: number;
}

export interface StatisticsResponse {
  totalKudos: number;
  kudosByTeam: TeamData[];
  kudosByCategory: CategoryData[];
  topReceivers: ReceiverData[];
  topGivers: GiverData[];
  trendData: TrendData[];
  timePeriod: string;
  timeConfig: string;
}

export interface TimeBasedResponse {
  timeSeries: TrendData[];
}

export interface TrendingKeywordsResponse {
  keywords: KeywordCount[];
}
