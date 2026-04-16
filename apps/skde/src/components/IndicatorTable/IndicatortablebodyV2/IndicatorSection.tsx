import React from "react";
import { IndicatorData, OptsTu } from "types";
import { level2 } from "qmongjs";
import { IndicatorRow } from "./IndicatorRow";

type IndicatorSectionProps = {
  unitNames: string[];
  medfield: string;
  levels: string;
  data: IndicatorData[];
  openRowID: string;
  registryName: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
  treatmentUnitsByLevel: OptsTu[];
};

export const IndicatorSection = (props: IndicatorSectionProps) => {
  const {
    unitNames,
    levels,
    data,
    openRowID,
    setOpenRowID,
    registryName,
    context,
    type,
    year,
    chartColours,
    treatmentUnitsByLevel,
    medfield,
  } = props;

  // Map indicators to rows and show only rows where there is at least
  // one indicator not removed by the filter
  return data.map((indDataRow) => {
    const showRow =
      levels === undefined
        ? true
        : indDataRow.data &&
            indDataRow.data
              .map(
                (dataPointRow) => level2(indDataRow, dataPointRow) === levels,
              )
              .every((x) => x === false)
          ? false
          : true;

    const returnVal = showRow ? (
      <IndicatorRow
        key={"IndicatorRow" + indDataRow.indicatorID}
        unitNames={unitNames}
        medfield={medfield}
        levels={levels}
        indData={indDataRow}
        rowID={indDataRow.indicatorID}
        openRowID={openRowID}
        setOpenRowID={setOpenRowID}
        registryName={registryName}
        context={context}
        type={type}
        year={year}
        chartColours={chartColours}
        treatmentUnitsByLevel={treatmentUnitsByLevel}
      />
    ) : null;

    return returnVal;
  });
};
