import { Icon, IconButton, SubjectAreaResultCard } from "@mong/material-ui";
import type { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { useState } from "react";
import type { Indicator } from "types";
import { createMedfieldTableData, type RowData } from "../MedfieldTable";

type MedfieldTable2Props = {
  unitName: string;
  year: number;
};

const levelFields = {
  high: "green",
  middle: "yellow",
  low: "red",
} as const satisfies Record<string, keyof RowData>;

type Level = keyof typeof levelFields;
type SortDirection = "asc" | "desc";

type SortConfig = {
  level: Level;
  direction: SortDirection;
};

const formatPercentageString = (
  numerator: number,
  denominator: number,
  prefix: string,
) => {
  if (denominator > 0) {
    return `${prefix} ${Math.round((numerator / denominator) * 100)} %`;
  } else {
    return "Tomt";
  }
};

export const MedfieldTable2 = (props: MedfieldTable2Props) => {
  const { unitName, year } = props;
  const [sortConfig, setSortConfig] = useState<SortConfig>();

  // Clickhandler for sorting
  const handleSort = (level: Level) => {
    setSortConfig((currentSort) => ({
      level,
      direction:
        currentSort?.level === level && currentSort.direction === "desc"
          ? "asc"
          : "desc",
    }));
  };

  // Fetch aggregated data
  const indicatorQuery: UseQueryResult<Indicator[], unknown> =
    useIndicatorQuery({
      treatmentYear: year,
      unitNames: [unitName],
      context: "caregiver",
      type: "ind",
    });

  if (indicatorQuery.isFetching || indicatorQuery?.data === undefined) {
    return null;
  }

  const rowData: RowData[] = createMedfieldTableData(
    indicatorQuery?.data,
  ).filter(Boolean) as NonNullable<RowData>[]; //Removes empty or undefined elements

  // Sort the row data based on the current sort configuration
  const rowDataToRender = sortConfig
    ? [...rowData].sort((firstRow, secondRow) => {
        const field = levelFields[sortConfig.level];
        const percentage = (row: RowData) =>
          Math.round((row[field] / (row.green + row.yellow + row.red)) * 100);
        const difference = percentage(secondRow) - percentage(firstRow);

        return sortConfig.direction === "desc" ? difference : -difference;
      })
    : rowData;

  return (
    <div className="flex flex-col w-full gap-2 pb-14">
      <h4 className="pb-8 pt-14 text-brand-primary-600">
        {`Måloppnåelse sortert på fagområde for ${unitName} i ${year}`}
      </h4>

      {rowDataToRender.map((row: RowData, index: number) => {
        const nPoints = row.green + row.yellow + row.red;
        const greenPercentage = formatPercentageString(
          row.green,
          nPoints,
          "Høy",
        );
        const yellowPercentage = formatPercentageString(
          row.yellow,
          nPoints,
          "Middels",
        );
        const redPercentage = formatPercentageString(row.red, nPoints, "Lav");

        const registries = [
          ...new Set(row.registers.map((reg) => reg.name)),
        ].filter((row) => row !== undefined);

        const externalUrl = `/behandlingskvalitet/?units=Nasjonalt_${unitName}&registries=${registries.join("_")}`;
        if (index === 0) {
          return (
            <SubjectAreaResultCard
              key={row.name}
              headers={{
                first: "Fagområde",
                second: "Målnivå:",
                sortHeaders: {
                  highLabel: "Høy",
                  middleLabel: "Middels",
                  lowLabel: "Lav",
                  onClick: (level) => {
                    handleSort(level);
                  },
                },
              }}
              buttonHref={externalUrl}
              high={greenPercentage}
              low={redPercentage}
              middle={yellowPercentage}
              title={row.name}
            />
          );
        } else {
          return (
            <SubjectAreaResultCard
              key={row.name}
              buttonHref={externalUrl}
              high={greenPercentage}
              low={redPercentage}
              middle={yellowPercentage}
              title={row.name}
            />
          );
        }
      })}
    </div>
  );
};
