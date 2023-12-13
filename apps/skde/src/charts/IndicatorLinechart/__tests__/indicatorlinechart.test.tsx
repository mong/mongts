import { countLevels, setMissingToZero, IndicatorLevels } from "..";
import { levelData } from "../../../../test/test_data/data";

test("Standard render", async () => {
  const expected = {
    0: [
      { number: 2, year: 2018 },
    ],
    1: [
      { number: 1, year: 2018 },
      { number: 3, year: 2019 },
    ],
    2: [
      { number: 3, year: 2020 },
    ],
  };
  const groupedLevels = countLevels(levelData as IndicatorLevels[]);
  expect(groupedLevels).toEqual(expected);
});
