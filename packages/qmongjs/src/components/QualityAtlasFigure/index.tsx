import { HeatMap, createHeatmapData } from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";

type QualityAtlasFigureProps = {
  width: number;
  minBoxWidth?: number;
  maxBoxWidth?: number;
  gap: number;
  context: string;
  year: number;
  indIDs: string[];
  unitNames: string[];
  indNameKey: { indID: string; indTitle: string; registryShortName: string }[];
};

export const QualityAtlasFigure = (props: QualityAtlasFigureProps) => {
  const {
    width,
    minBoxWidth,
    maxBoxWidth,
    gap,
    context,
    year,
    indIDs,
    unitNames,
    indNameKey,
  } = props;

  const queryParams: FetchIndicatorParams = {
    context: context,
    treatmentYear: year,
    unitNames: unitNames,
    type: "ind",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const indicatorData = indicatorQuery.data as Indicator[];

  let filteredData: Indicator[];

  // Filter out the selected medical fields
  filteredData = indicatorData.filter((row) => {
    return indIDs.includes(row.ind_id);
  });

  // Remove units with no data
  const validUnitNames = unitNames.filter((unitName) =>
    filteredData.find((row) => row.unit_name === unitName),
  );

  filteredData = filteredData.filter((row) =>
    validUnitNames.includes(row.unit_name),
  );

  // Transform the data
  const heatmapData = createHeatmapData(filteredData, validUnitNames, indIDs);

  // Sort the columns according to the number of data-less units
  const combinedList = [];

  for (let i = 0; i < heatmapData.data.length; i++) {
    combinedList.push({
      column: heatmapData.data[i],
      indID: indIDs[i],
    });
  }

  heatmapData.data = combinedList.map((x) => x.column);
  const sortedIndIDs = combinedList.map((x) => x.indID);

  if (heatmapData.data.length === 0) {
    return null;
  }

  return (
    <div style={{ margin: 40 }}>
      <>
        <HeatMap
          heatmapData={heatmapData}
          width={width}
          minBoxWidth={minBoxWidth}
          maxBoxWidth={maxBoxWidth}
          separation={gap}
          year={year}
        />
      </>
      <>
        <h3>Indikatorer</h3>
        <ol>
          {sortedIndIDs.map((indIDRow, index) => {
            const indName = indNameKey.find((indKeyRow) => {
              return indKeyRow.indID === indIDRow;
            });
            return indName ? (
              <li key={"ind-" + index}>
                {indName.indTitle + " [" + indName.registryShortName + "]"}
              </li>
            ) : null;
          })}
        </ol>
      </>
    </div>
  );
};
