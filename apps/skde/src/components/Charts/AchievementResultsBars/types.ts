export type AchievementResultsBarsProps = {
  registerShortName?: string;
  unitNames?: string[];
  unitLevel?: "nation" | "rhf" | "hf" | "hospital";
  startYear: number;
  endYear: number;
};

export type AchievementLevel = {
  ind_id: string;
  year: number;
  level: 0 | 1 | 2 | -1;
};

export type DataPoint = {
  year: number;
  number: number;
};

export type GroupedLevels = {
  0: DataPoint[];
  1: DataPoint[];
  2: DataPoint[];
};

export type DisplayLevel = "high" | "medium" | "low";

export type YearAchievement = {
  year: number;
  indicators: {
    level: DisplayLevel;
    label: string;
    result: number;
  }[];
};

export type ChartPoint = {
  x: number;
  y: number;
};

export type ChartData = [ChartPoint[], ChartPoint[], ChartPoint[]];
