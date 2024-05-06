import { countLevels, setMissingToZero, IndicatorLevels } from "..";
import { LinechartData } from "../../LinechartBase";
import { levelData } from "../../../../test/test_data/data";
import { vi } from "vitest";

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
      { x: new Date(2018, 0), y: 2 },
      { x: new Date(2019, 0), y: 0 },
      { x: new Date(2020, 0), y: 0 },
    ] as LinechartData[],
    [
      { x: new Date(2018, 0), y: 1 },
      { x: new Date(2019, 0), y: 3 },
      { x: new Date(2020, 0), y: 0 },
    ] as LinechartData[],
    [
      { x: new Date(2018, 0), y: 0 },
      { x: new Date(2019, 0), y: 0 },
      { x: new Date(2020, 0), y: 3 },
    ] as LinechartData[],
  ];

  const groupedLevels = countLevels(levelData as IndicatorLevels[]);
  expect(groupedLevels).toEqual(expectedGroupedLevels);

  const chartData = setMissingToZero(groupedLevels, 2018, 2020);
  expect(chartData).toEqual(expectedChartData);
});
