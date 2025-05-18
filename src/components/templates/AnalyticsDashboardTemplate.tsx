import React from "react";
import { motion } from "framer-motion";
import TimeRangeSelector from "@/components/molecules/TimeRangeSelector";
import SummaryCardsSection from "@/components/organisms/SummaryCardsSection";
import ChartsSection from "@/components/organisms/ChartsSection";
import TopReceiversSection from "@/components/organisms/TopReceiversSection";
import TopCategoriesSection from "@/components/organisms/TopCategoriesSection";

interface TimeRangeOption {
  value: string;
  label: string;
}

interface SummaryCardData {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
}

interface ChartData {
  title: string;
  description: string;
}

interface KudosReceiver {
  id: number;
  name: string;
  count: number;
  trend: "up" | "down" | "same";
}

interface Category {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

interface AnalyticsDashboardTemplateProps {
  timeRangeOptions: TimeRangeOption[];
  selectedTimeRange: string;
  onTimeRangeChange: (value: string) => void;
  summaryCardsData: SummaryCardData[];
  chartsData: ChartData[];
  topReceiversData: KudosReceiver[];
  topCategoriesData: Category[];
  onViewFullReport: () => void;
  onExportData: () => void;
}

const AnalyticsDashboardTemplate: React.FC<AnalyticsDashboardTemplateProps> = ({
  timeRangeOptions,
  selectedTimeRange,
  onTimeRangeChange,
  summaryCardsData,
  chartsData,
  topReceiversData,
  topCategoriesData,
  onViewFullReport,
  onExportData,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              Track and analyze kudos activity across the organization
            </p>
          </div>
          <TimeRangeSelector
            options={timeRangeOptions}
            selectedValue={selectedTimeRange}
            onChange={onTimeRangeChange}
          />
        </div>

        {/* Summary Cards */}
        <SummaryCardsSection
          data={summaryCardsData}
          timeRange={selectedTimeRange}
          className="mb-6"
        />

        {/* Charts Grid */}
        <ChartsSection 
          data={chartsData} 
          timeRange={selectedTimeRange} 
          className="mb-6" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Kudos Receivers */}
          <TopReceiversSection
            data={topReceiversData}
            onViewFullReport={onViewFullReport}
          />

          {/* Top Categories */}
          <TopCategoriesSection
            data={topCategoriesData}
            onExportData={onExportData}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboardTemplate;
