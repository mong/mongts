import { Box, SplitButton } from "@mong/material-ui";
import type { JSX } from "react";
import { AchievementResultsBars } from "../../Charts/AchievementResultsBars";
import { HospitalProfileLinePlotV2 } from "../HospitalProfileLinePlotV2";

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
          <SplitButton
            label="Last ned"
            onClick={() => {}}
            options={["PDF", "SVG", "PNG", "CSV"]}
            steps="one-step"
          />
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
        startYear={startYear}
        endYear={endYear}
      />
    </Box>
  );
};

type TrendAnalysisCardProps = {
  unitFullName: string;
  unitName: string;
  lastYear: number;
  pastYears: number;
};

const TrendAnalysisCard = ({
  unitFullName,
  unitName,
  lastYear,
  pastYears,
}: TrendAnalysisCardProps) => {
  return (
    <>
      <Box
        rounded={false}
        padded={false}
        className="rounded-lg py-10 pl-12 pr-0 h-159"
      >
        <HospitalProfileLinePlotV2
          unitFullName={unitFullName}
          unitNames={unitName}
          lastYear={lastYear}
          pastYears={pastYears}
        />
      </Box>
      <Box
        padded={false}
        rounded={false}
        className="p-10 rounded-lg text-dark"
        color="white"
      >
        <h4 className="pb-4">10-års trendanalyse</h4>
        Siden 2015 har høy måloppnåelse økt med 23 %, mens lavmåloppnåelse har
        blitt redusert med 12 %. Den største forbedringen skjedde mellom 2022 og
        2024.
      </Box>
    </>
  );
};

export type TopSummarySectionProps = {
  selectedTreatmentUnit: (string | null | undefined)[] | undefined;
  unitName: string;
  unitFullName: string;
  lastYear: number;
  pastYears: number;
};

export const TopSummarySection = ({
  selectedTreatmentUnit,
  unitName,
  unitFullName,
  lastYear,
  pastYears,
}: TopSummarySectionProps): JSX.Element => {
  return (
    <div className="w-full h-250 py-6">
      <SummaryHeader selectedTreatmentUnit={selectedTreatmentUnit} />

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
            unitFullName={unitFullName}
            unitName={unitName}
            lastYear={lastYear}
            pastYears={pastYears}
          />
        </div>
      </div>
    </div>
  );
};
