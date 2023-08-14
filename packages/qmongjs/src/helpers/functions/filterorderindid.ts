import { Indicator, Description } from "types";
import { level as defineLevel } from "./defineLevel";

/**
 * Returns an ordered and filtered list of indicator IDs.
 * This list decides which indicator to show and in what order.
 * - The indicators will be ordered by the name variable in the indicator table (indDescription)
 * - If no treatment units are selected, all indicators with national data will be shown
 * - If target level is selected (H, M or L), only keep indicators where at least one treatment unit have the given target level.
 *
 * @param isFetching Are we still fetching data?
 * @param selectedNames Selected treatment units + "Nasjonalt"
 * @param indData Data for the selected treatment units (including national data) and selected year from one registry
 * @param indDescription Indicator descriptions for all indicators from one registry
 * @param level Selected target level, if selected (H, M or L)
 * @param tableType Single registry page or all registry page
 * @returns Ordered and filtered array of indicator IDs
 */
export const filterOrderIndID = (
  isFetching: boolean,
  selectedNames: string[],
  indData: Indicator[],
  indDescription: Description[],
  level: string,
  tableType: "singleRegister" | "allRegistries",
): string[] => {
  /* Number of unique treatment units in indData */
  const namesLength = Array.from(
    new Set(indData.map((data) => data.unit_name)),
  ).length;

  const indId: string[] = Array.from(
    new Set(
      indData
        .filter((d: Indicator) => {
          const nation =
            tableType === "singleRegister" ||
            isFetching ||
            selectedNames.length === 1
              ? false
              : namesLength === 1 && isFetching
              ? false
              : d.unit_name === "Nasjonalt";
          if (level === "") {
            return !nation;
          }
          const levelFilter = defineLevel(d) !== level;
          const dg = (d.dg ?? 1) < 0.6 && d.unit_name !== "Nasjonalt";
          const minDenom = indDescription
            .filter((dDesc) => dDesc.id === d.ind_id)
            .map((d) => d.min_denominator)[0];
          const lowN = d.denominator < (minDenom ?? 5);
          return !(nation || levelFilter || dg || lowN);
        })
        .map((d: Indicator) => d.ind_id),
    ),
  );

  const orderedIndID = indDescription
    .sort((a, b) => {
      return (a.name ?? "") > (b.name ?? "")
        ? 1
        : (a.name ?? "") < (b.name ?? "")
        ? -1
        : 0;
    })
    .map((d) => d.id)
    .filter((d) => indId.includes(d));

  return orderedIndID;
};
