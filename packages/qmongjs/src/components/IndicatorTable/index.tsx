import { IndicatorTableHeader } from "./indicatortableheader";
import { IndicatorTableBody } from "./indicatortablebody";
import { RegisterName } from "types";
import { useState, useCallback } from "react";

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
  } = props;
  const [emptyBlocks, setEmptyBlocks] = useState<Set<string>>(new Set());

  const handleEmptyStatusChanged = useCallback(
    (registerName: string, isEmpty: boolean) => {
      setEmptyBlocks((prevEmptyBlocks) => {
        const newEmptyBlocks = new Set(prevEmptyBlocks);
        if (isEmpty) {
          newEmptyBlocks.add(registerName);
        } else {
          newEmptyBlocks.delete(registerName);
        }
        return newEmptyBlocks;
      });
    },
    [],
  );

  const isTableEmpty = emptyBlocks.size === registerNames.length;

  return (
    <>
      {!isTableEmpty && (
        <table>
          <IndicatorTableHeader
            colspan={colspan}
            unitNames={unitNames}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
            descriptionHeader={descriptionHeader}
            treatmentYear={showTreatmentYear ? treatmentYear : undefined}
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
            onEmptyStatusChanged={handleEmptyStatusChanged}
          />
        </table>
      )}
    </>
  );
};
