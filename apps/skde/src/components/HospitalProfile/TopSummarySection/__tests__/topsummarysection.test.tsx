import { first } from "lodash";
import { expect, test, vi } from "vitest";
import {
  countLevels,
  type IndicatorLevelsV2,
  setMissingToZero,
  trendAnalysisString,
} from "../functions";
import { levelData } from "./data";

type LinechartData = {
  id?: number;
  x: number;
  y: number;
};

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
    style: {
      fontFamily: "Plus Jakarta Sans",
    },
  }),
}));

test("Levels counts are correct", async () => {
  const expectedGroupedLevels = {
    0: [{ number: 2, year: 2018 }],
    1: [
      { number: 1, year: 2018 },
      { number: 3, year: 2019 },
    ],
    2: [{ number: 3, year: 2020 }],
  };

  const expectedChartData: LinechartData[][] = [
    [
      { x: 2018, y: 2 },
      { x: 2019, y: 0 },
      { x: 2020, y: 0 },
    ] as LinechartData[],
    [
      { x: 2018, y: 1 },
      { x: 2019, y: 3 },
      { x: 2020, y: 0 },
    ] as LinechartData[],
    [
      { x: 2018, y: 0 },
      { x: 2019, y: 0 },
      { x: 2020, y: 3 },
    ] as LinechartData[],
  ];

  const groupedLevels = countLevels(levelData as IndicatorLevelsV2[]);
  expect(groupedLevels).toEqual(expectedGroupedLevels);

  const chartData = setMissingToZero(groupedLevels, 2018, 2020);
  expect(chartData).toEqual(expectedChartData);
});

test("Trend analysis is correct", async () => {
  const lastYear = 2025;
  const pastYears = 10;

  expect(trendAnalysisString(0, 0, lastYear, pastYears)).toEqual(
    `I 2025 er høy måloppnåelse og lav måloppnåelse lik det de var i 2015.`,
  );
  expect(trendAnalysisString(10, 0, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse økt med 10 %. Lav måloppnåelse er lik det den var i 2015.",
  );
  expect(trendAnalysisString(-10, 0, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse minket med 10 %. Lav måloppnåelse er lik det den var i 2015.",
  );
  expect(trendAnalysisString(0, 10, lastYear, pastYears)).toEqual(
    "I 2025 er høy måloppnåelse det samme som i 2015. Lav måloppnåelse har økt med 10 % siden 2015.",
  );
  expect(trendAnalysisString(0, -10, lastYear, pastYears)).toEqual(
    "I 2025 er høy måloppnåelse det samme som i 2015. Lav måloppnåelse har minket med 10 % siden 2015.",
  );
  expect(trendAnalysisString(10, 10, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse økt med 10 %, mens lav måloppnåelse har økt med 10 %.",
  );
  expect(trendAnalysisString(-10, 10, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse minket med 10 %, mens lav måloppnåelse har økt med 10 %.",
  );
  expect(trendAnalysisString(10, -10, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse økt med 10 %, mens lav måloppnåelse har minket med 10 %.",
  );
  expect(trendAnalysisString(-10, -10, lastYear, pastYears)).toEqual(
    "Siden 2015 har høy måloppnåelse minket med 10 %, mens lav måloppnåelse har minket med 10 %.",
  );
});
