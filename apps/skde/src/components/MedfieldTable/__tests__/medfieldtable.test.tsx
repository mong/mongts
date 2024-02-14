import { createMedfieldTableData } from "..";
import { medfieldTableData } from "../../../../test/test_data/data";
import { test, expect } from "vitest";

test("Levels counts are correct", () => {
  const data = createMedfieldTableData(medfieldTableData);
  expect(data).toMatchSnapshot();
});
