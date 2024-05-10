import { HeatMap, createHeatmapData } from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";

export type QualityAtlasFigureProps = {
  width: number;
  gap: number;
  context: string;
  year: number;
  indicatorIDs: string[];
  unitNames: string[];
};

export const QualityAtlasFigure = (props: QualityAtlasFigureProps) => {
  const { width, gap, context, year, indicatorIDs, unitNames } = props;

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

  const filteredData = indicatorData.filter((row) => {
    return indicatorIDs.includes(row.ind_id);
  });

  const indNameKey = filteredData.map((row) => {
    return { indID: row.ind_id, indTitle: row.ind_title };
  });

  const data = createHeatmapData(filteredData, unitNames, indicatorIDs);

  return (
    <div style={{ margin: 40 }}>
      <div>
        <HeatMap heatmapData={data} width={width} separation={gap}></HeatMap>
      </div>
      <div>
        <h3>Indikatorer</h3>
        <ol>
          {indicatorIDs.map((indIDRow, index) => {
            const indName = indNameKey.find((indKeyRow) => {
              return indKeyRow.indID === indIDRow;
            });
            return indName ? (
              <li key={"ind-" + index}>{indName.indTitle}</li>
            ) : null;
          })}
        </ol>
      </div>
    </div>
  );
};
