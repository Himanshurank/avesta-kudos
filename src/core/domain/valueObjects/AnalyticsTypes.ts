export interface TeamCount {
  team: string;
  count: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface RecipientCount {
  name: string;
  count: number;
}

export interface TimeSeriesPoint {
  period: string;
  count: number;
}

export interface KeywordCount {
  keyword: string;
  count: number;
}

export interface StatisticsResponse {
  totalKudos: number;
  kudosByTeam: TeamCount[];
  kudosByCategory: CategoryCount[];
  topRecipients: RecipientCount[];
}

export interface TimeBasedResponse {
  timeSeries: TimeSeriesPoint[];
}

export interface TrendingKeywordsResponse {
  keywords: KeywordCount[];
}
