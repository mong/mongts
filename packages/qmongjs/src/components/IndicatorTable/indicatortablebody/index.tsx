import { RegisterName } from "types";
import TableBlock from "../tableblock";
import { NoDataAvailible } from "../ContenForEmptyTable";

export interface IndicatorTableBodyProps {
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
  registryButton?: boolean;
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
    registryButton,
  } = props;

  const done: string[] = [];
  const register_block = registerNames.map((register, i) => {
    if (!done.includes(register.rname)) {
      done.push(register.rname);

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
          registryButton={registryButton}
        />
      );
    } else {
      return null;
    }
  });
  const isEmpty = !done.length;

  return (
    <tbody>
      {isEmpty && <NoDataAvailible colspan={colspan} />}
      {register_block}
    </tbody>
  );
};
