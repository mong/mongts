import { Box } from "@mong/material-ui";
import type { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import type { JSX } from "react";
import type { Indicator, IndicatorLineChartDataPoint } from "types";
import { AchievementResultsBars } from "../../Charts/AchievementResultsBars";
import { HospitalProfileLinePlotV2 } from "../HospitalProfileLinePlotV2";
import { formatChartData, trendAnalysisString } from "./functions";

type SummaryHeaderProps = {
  selectedTreatmentUnit: (string | null | undefined)[] | undefined;
};

const SummaryHeader = ({ selectedTreatmentUnit }: SummaryHeaderProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap w-full justify-between items-center max-w-360">
        <Box
          rounded={false}
          className="flex justify-between items-center bg-neutral-0 border-none w-full h-28 rounded-lg"
        >
          <h3 className="text-brand-primary-600">{selectedTreatmentUnit}</h3>
        </Box>
      </div>
    </div>
  );
};

type AchievementSummaryCardProps = {
  title: string;
  unitName: string;
  startYear: number;
  endYear: number;
};

const AchievementSummaryCard = ({
  title,
  unitName,
  startYear,
  endYear,
}: AchievementSummaryCardProps) => {
  return (
    <Box
      rounded={false}
      padded={false}
      className="flex flex-col justify-between h-full text-brand-primary-500 rounded-lg py-10 px-10"
    >
      <h4 className="-mt-0.5 mb-6">{title}</h4>
      <AchievementResultsBars
        unitNames={[unitName]}
        type={"ind"}
        context={"caregiver"}
        startYear={startYear}
        endYear={endYear}
      />
    </Box>
  );
};

type TrendAnalysisProps = {
  data: IndicatorLineChartDataPoint[][];
  lastYear: number;
  pastYears: number;
};

const TrendAnalysis = (props: TrendAnalysisProps) => {
  const { data, lastYear, pastYears } = props;

  // High result level is index 0, medium index 1 and low index 2
  const greenData = data[0];
  const redData = data[2];

  const greenDifference = Math.round(
    (greenData[pastYears].y - greenData[0].y) * 100,
  );
  const redDifference = Math.round((redData[pastYears].y - redData[0].y) * 100);

  return (
    <Box
      padded={false}
      rounded={false}
      className="p-10 rounded-lg text-dark"
      color="white"
    >
      <h4 className="pb-4">10-års trendanalyse</h4>
      {trendAnalysisString(greenDifference, redDifference, lastYear, pastYears)}
    </Box>
  );
};

type TrendAnalysisCardProps = {
  unitName: string;
  lastYear: number;
  pastYears: number;
};

const TrendAnalysisCard = ({
  unitName,
  lastYear,
  pastYears,
}: TrendAnalysisCardProps) => {
  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<Indicator[], unknown> =
    useIndicatorQuery({
      unitNames: [unitName],
      context: "caregiver",
      type: "ind",
    });

  if (indicatorQuery.isFetching || indicatorQuery.data === undefined) {
    return null;
  }

  const chartData = formatChartData(
    indicatorQuery.data,
    lastYear - pastYears,
    lastYear,
  );

  return (
    <>
      <Box
        rounded={false}
        padded={false}
        className="rounded-lg py-10 pl-12 pr-0 h-159"
      >
        <HospitalProfileLinePlotV2 chartData={chartData} />
      </Box>

      <TrendAnalysis
        data={chartData}
        lastYear={lastYear}
        pastYears={pastYears}
      />
    </>
  );
};

export type TopSummarySectionProps = {
  unitName: string;
  unitFullName: string;
  lastYear: number;
  pastYears: number;
};

export const TopSummarySection = ({
  unitName,
  unitFullName,
  lastYear,
  pastYears,
}: TopSummarySectionProps): JSX.Element => {
  return (
    <div
      className="w-full h-250 py-6"
      data-testid={`hospital_profile-title-${unitName}`}
    >
      <SummaryHeader selectedTreatmentUnit={[unitFullName]} />

      <div className="flex w-full pt-5">
        <div className="w-1/2 flex flex-col gap-5 z-50">
          <AchievementSummaryCard
            title={`Måloppnåelse ${lastYear}`}
            unitName={unitName}
            startYear={lastYear}
            endYear={lastYear}
          />
          <AchievementSummaryCard
            title={`Måloppnåelse ${lastYear - 3} - ${lastYear - 1}`}
            unitName={unitName}
            startYear={lastYear - 3}
            endYear={lastYear - 1}
          />
        </div>

        <div className="w-1/2 flex flex-col ml-4 gap-5">
          <TrendAnalysisCard
            unitName={unitName}
            lastYear={lastYear}
            pastYears={pastYears}
          />
        </div>
      </div>
    </div>
  );
};
