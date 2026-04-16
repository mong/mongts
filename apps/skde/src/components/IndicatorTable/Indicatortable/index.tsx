import { useState } from "react";
import { StyledTable } from "./IndicatorTableStyles";
import { useSearchParams } from "next/navigation";
import { RegistrySection } from "./RegistrySection";

type IndicatorTableProps = {
  context: string;
  type: string;
  year: number;
  unitNames: string[];
  levels: string;
  medfields: string[];
  chartColours: string[];
};

export const IndicatorTable = (props: IndicatorTableProps) => {
  const { context, type, year, unitNames, levels, medfields, chartColours } =
    props;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const openRowParam = params.get("selected_row");

  const [openRowID, setOpenRowID] = useState<string>(
    openRowParam ? openRowParam : "",
  );

  return (
    <StyledTable sx={{ marginTop: "0.625rem" }}>
      {medfields.map((medfield) => (
        <RegistrySection
          key={medfield}
          levels={levels}
          unitNames={unitNames}
          medfield={medfield}
          openRowID={openRowID}
          setOpenRowID={setOpenRowID}
          context={context}
          type={type}
          year={year}
          chartColours={chartColours}
        />
      ))}
    </StyledTable>
  );
};
