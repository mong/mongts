import React from "react";

import { IndicatorTableHeader } from "./indicatortableheader";
import { IndicatorTableBodyV2 } from "./IndicatortablebodyV2";
import { RegisterName } from "types";

export interface IndicatorTableProps {
  context: string;
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
}

export const IndicatorTable: React.FC<IndicatorTableProps> = (props) => {
  const {
    context,
    tableType,
    unitNames = ["Nasjonalt"],
    treatmentYear = 2019,
    colspan,
    medicalFieldFilter,
    showLevelFilter,
    selection_bar_height,
    legend_height,
    registerNames,
    descriptionHeader,
    blockTitle,
  } = props;

  return (
    <table>
      <IndicatorTableHeader
        colspan={colspan}
        unitNames={unitNames}
        selection_bar_height={selection_bar_height}
        legend_height={legend_height}
        descriptionHeader={descriptionHeader}
      />
      <IndicatorTableBodyV2
        context={context}
        unitNames={unitNames}
        registers={registerNames.map((row) => {return(row.rname)})}
        year={treatmentYear}
        type={"ind"}
        width={800}

      />
    </table>
  );
};

export default IndicatorTable;
