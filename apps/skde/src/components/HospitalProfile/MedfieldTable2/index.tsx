import { SubjectAreaResultCard } from "@mong/material-ui";
import type { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import type { Indicator } from "types";
import { createMedfieldTableData, type RowData } from "../MedfieldTable";

type MedfieldTable2Props = {
  unitName: string;
  year: number;
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

  const rowData: RowData[] = createMedfieldTableData(indicatorQuery?.data);

  return (
    <div className="flex flex-col w-full gap-2 pb-14">
      <h4 className="pb-8 pt-14 text-brand-primary-600">
        {`Måloppnåelse sortert på fagområde for ${unitName} i ${year}`}
      </h4>

      {rowData.map((row: RowData, index: number) => {
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
        if (index === 1) {
          return (
            <SubjectAreaResultCard
              key={row.name}
              headers={{
                first: "Fagområde",
                second: "Målnivå",
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
