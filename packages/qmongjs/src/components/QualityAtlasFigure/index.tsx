import { HeatMap, createHeatmapData } from "qmongjs";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import { Indicator } from "types";
import { level } from "qmongjs";
import { HeatMapColumn } from "../Charts/HeatMap";

export type QualityAtlasFigureProps = {
  width: number;
  gap: number;
  context: string;
  year: number;
  indicatorIDs: string[];
  medField: string;
  unitNames: string[];
};

export const QualityAtlasFigure = (props: QualityAtlasFigureProps) => {
  const { width, gap, context, year, indicatorIDs, medField, unitNames } =
    props;

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
  let indIDs: string[];

  // If the medfield argument is set, filter out the correct indicators and ignore the indicatorID argument
  if (medField.length === 0) {
    filteredData = indicatorData.filter((row) => {
      return indicatorIDs.includes(row.ind_id);
    });
    indIDs = indicatorIDs;
  } else {
    filteredData = indicatorData.filter((row) => {
      return row.medfield_name === medField;
    });
    indIDs = filteredData
      .map((row) => {
        return row.ind_id;
      })
      .filter((val, ind, array) => {
        return array.indexOf(val) === ind;
      });
  }

  if (filteredData.length === 0) {
    return null;
  }

  // Remove units with no data
  const validUnitNames = unitNames.filter((unitName) => {
    return (
      filteredData
        .filter((row) => {
          return row.unit_name === unitName;
        })
        .map((row) => level(row)).length > 0
    );
  });

  filteredData = filteredData.filter((row) => {
    return validUnitNames.includes(row.unit_name);
  });

  const filteredIndIDs = indIDs.filter((indID) => {
    return filteredData.map((row) => row.ind_id).includes(indID);
  });

  // Map indicator IDs to description
  const indNameKey = filteredData.map((row) => {
    return {
      indID: row.ind_id,
      indTitle: row.ind_title,
      registryShortName: row.registry_short_name,
    };
  });

  // Transform the data
  const heatmapData = createHeatmapData(
    filteredData,
    validUnitNames,
    filteredIndIDs,
  );

  // Remove columns whith no data
  heatmapData.data = heatmapData.data.filter((col) => {
    const nRows = heatmapData.data[0].bins.length;
    const counts = col.bins.map((bin) => bin.count);
    const invalidCounts = counts.filter((bin) => {
      return bin == -1;
    });
    return invalidCounts.length === nRows ? false : true;
  });

  // Sort the columns according to the number of data-less units
  const combinedList = [];

  for (let i = 0; i < heatmapData.data.length; i++) {
    combinedList.push({
      column: heatmapData.data[i],
      indID: filteredIndIDs[i],
    });
  }

  combinedList.sort((a, b) => {
    const count = (x: { column: HeatMapColumn; indID: string }) =>
      x.column.bins.filter((val) => {
        return val.count !== -1;
      }).length;

    const aCount = count(a);
    const bCount = count(b);

    return aCount > bCount ? -1 : aCount === bCount ? 0 : 1;
  });

  heatmapData.data = combinedList.map((x) => x.column);
  const sortedIndIDs = combinedList.map((x) => x.indID);

  return (
    <div style={{ margin: 40 }}>
      <div>
        <HeatMap
          heatmapData={heatmapData}
          width={width}
          separation={gap}
        ></HeatMap>
      </div>
      <div>
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
      </div>
    </div>
  );
};
