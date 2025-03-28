import { IndicatorTableHeader } from "./indicatortableheader";
import { IndicatorTableBody } from "./indicatortablebody";
import { RegisterName } from "types";
import { NestedTreatmentUnitName } from "types";
import { useIndicatorQuery } from "../../helpers/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { Indicator } from "types";
import { NoDataAvailable } from "./ContentForEmptyTable";
import { level } from "../../helpers/functions";

interface IndicatorTableProps {
  context: string;
  dataQuality: boolean;
  tableType: "allRegistries" | "singleRegister";
  colspan: number;
  descriptionHeader?: string;
  unitNames: string[];
  national?: string;
  selection_bar_height: number | null;
  legend_height: number | null;
  registerNames: RegisterName[];
  treatmentYear: number;
  medicalFieldFilter: string[];
  showLevelFilter?: string;
  blockTitle?: string[];
  showTreatmentYear?: boolean;
  nestedUnitNames?: NestedTreatmentUnitName[];
  chartColours: string[];
}

export const IndicatorTable = (props: IndicatorTableProps) => {
  const {
    context,
    dataQuality,
    tableType,
    unitNames = ["Nasjonalt"],
    treatmentYear = 2023,
    colspan,
    medicalFieldFilter,
    showLevelFilter,
    selection_bar_height,
    legend_height,
    registerNames,
    descriptionHeader,
    blockTitle,
    showTreatmentYear,
    nestedUnitNames,
    chartColours,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    unitNames: unitNames,
    treatmentYear: treatmentYear,
    type: dataQuality ? "dg" : "ind",
  });

  if (indicatorDataQuery.isFetching) {
    return null;
  }

  // Count the number of rows of data to be shown in the whole table.
  // Filter on selected registries first.
  let rowCountData = indicatorDataQuery.data.filter((row: Indicator) => {
    return medicalFieldFilter.includes(row.registry_name);
  });

  // If one or more treatment units that is not "Nasjonalt" is selected, then the data shown is governed by the data for those units.
  // Indicators from "Nasjonalt" will be excluded if the other treatment units do not have data for these indicators.
  if (unitNames.length > 1 || unitNames[0] !== "Nasjonalt") {
    rowCountData = indicatorDataQuery.data
      .filter((row: Indicator) =>
        medicalFieldFilter.includes(row.registry_name),
      )
      .filter((row: Indicator) => row.unit_name !== "Nasjonalt");
  }

  // If the selected context is "caregiver", the table is not empty if there is data for "resident".
  // Instead a message should be displayed per registry.
  if (context === "resident") {
    rowCountData = rowCountData.filter(
      (row: Indicator) => row.context === context,
    );
  }

  // Filter on level if selected
  if (showLevelFilter) {
    rowCountData = rowCountData.filter(
      (row: Indicator) => level(row) === showLevelFilter,
    );
  }

  const isTableEmpty = rowCountData.length === 0;

  if (!isTableEmpty) {
    return (
      <>
        <table>
          <IndicatorTableHeader
            colspan={colspan}
            unitNames={unitNames}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
            descriptionHeader={descriptionHeader}
            treatmentYear={showTreatmentYear ? treatmentYear : undefined}
            nestedUnitNames={nestedUnitNames}
          />
          <IndicatorTableBody
            context={context}
            dataQuality={dataQuality}
            tableType={tableType}
            colspan={colspan}
            registerNames={registerNames}
            unitNames={unitNames}
            treatmentYear={treatmentYear}
            medicalFieldFilter={medicalFieldFilter}
            showLevelFilter={showLevelFilter ?? ""}
            blockTitle={blockTitle}
            chartColours={chartColours}
          />
        </table>
      </>
    );
  } else {
    return (
      <table>
        <tbody>{<NoDataAvailable colspan={colspan} />}</tbody>
      </table>
    );
  }
};
