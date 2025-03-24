import { RegisterName } from "types";
import TableBlock from "../tableblock";

interface IndicatorTableBodyProps {
  context: string;
  dataQuality: boolean;
  tableType: "allRegistries" | "singleRegister";
  colspan: number;
  registerNames: RegisterName[];
  unitNames: string[];
  treatmentYear: number;
  medicalFieldFilter: string[];
  showLevelFilter: string;
  blockTitle?: string[];
  onEmptyStatusChanged?: (registerName: string, isEmpty: boolean) => void;
  chartColours: string[];
}

export const IndicatorTableBody = (props: IndicatorTableBodyProps) => {
  const {
    context,
    dataQuality,
    tableType,
    colspan,
    registerNames,
    unitNames,
    treatmentYear,
    medicalFieldFilter,
    showLevelFilter,
    blockTitle,
    chartColours,
  } = props;

  const register_block = registerNames.map((register, i) => {
    return (
      <TableBlock
        context={context}
        dataQuality={dataQuality}
        tableType={tableType}
        key={`${register.rname}`}
        registerName={register}
        colspan={colspan}
        unitNames={unitNames}
        treatmentYear={treatmentYear}
        medicalFieldFilter={medicalFieldFilter}
        showLevelFilter={showLevelFilter}
        blockTitle={blockTitle ? blockTitle[i] : undefined}
        chartColours={chartColours}
      />
    );
  });

  return <tbody>{register_block}</tbody>;
};
