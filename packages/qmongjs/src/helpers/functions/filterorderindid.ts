import { Indicator, Description, Levels } from "types";

export const filterOrderIndID = (
  isFetching: boolean,
  selectedNames: string[],
  indData: Indicator[],
  indDescription: Description[],
  level: Levels,
  tableType: "singleRegister" | "allRegistries"
): string[] => {
  const namesLength = Array.from(
    new Set(indData.map((data) => data.unit_name))
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
          const levelFilter = d.level !== level;
          const dg = (d.dg ?? 1) < 0.6;
          const minDenom = indDescription
            .filter((dDesc) => dDesc.id === d.ind_id)
            .map((d) => d.min_denominator)[0];
          const lowN = d.denominator < (minDenom ?? 5);
          return !(nation || levelFilter || dg || lowN);
        })
        .map((d: Indicator) => d.ind_id)
    )
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
