import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import style from "./tableblock.module.css";
import {
  useDescriptionQuery,
  useIndicatorQuery,
  useResidentDataQuery,
} from "../../../helpers/hooks";
import { filterOrderIndID } from "../../../helpers/functions";
import { IndicatorRow } from "../indicatorrow";
import { TableBlockTitle } from "./tableblocktitle";
import { Description, Indicator, RegisterName, ResidentData } from "types";
import { IndicatorTableSkeleton } from "../IndicatorTableSkeleton";
import { TableRow, TableCell, Box, Stack } from "@mui/material";
import Link from "next/link";

interface TableBlockProps {
  context: string;
  dataQuality: boolean;
  tableType: "allRegistries" | "singleRegister";
  registerName: RegisterName;
  blockTitle?: string;
  treatmentYear: number;
  unitNames: string[];
  trRegisterNameClass?: string;
  medicalFieldFilter: string[];
  showLevelFilter: string;
  colspan: number;
  onEmptyStatusChanged?: (registerName: string, isEmpty: boolean) => void;
  chartColours: string[];
}

const SkeletonRow = (colSpan: number) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <IndicatorTableSkeleton nRows={1} />
      </TableCell>
    </TableRow>
  );
};

const TableBlock = (props: TableBlockProps) => {
  const {
    context,
    dataQuality,
    tableType,
    registerName,
    colspan,
    trRegisterNameClass = "register-row",
    treatmentYear,
    medicalFieldFilter,
    showLevelFilter,
    blockTitle,
    unitNames,
    chartColours,
  } = props;
  const queryContext = dataQuality
    ? { context, type: "dg" }
    : { context, type: "ind" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    registerShortName: registerName.rname,
    unitNames,
    treatmentYear,
    type: queryContext.type,
    context: queryContext.context,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const descriptionQuery: UseQueryResult<any, unknown> = useDescriptionQuery({
    registerShortName: registerName.rname,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const residentDataQuery: UseQueryResult<any, unknown> = useResidentDataQuery(
    registerName.rname,
  );

  const isFetching =
    indicatorDataQuery.isFetching ||
    descriptionQuery.isFetching ||
    residentDataQuery.isFetching;

  const uniqueOrderedInd: string[] = useMemo(
    () =>
      filterOrderIndID(
        isFetching ?? false,
        unitNames,
        indicatorDataQuery.data ?? [],
        descriptionQuery.data ?? [],
        showLevelFilter,
        tableType,
      ),
    [
      tableType,
      isFetching,
      unitNames,
      descriptionQuery.data,
      indicatorDataQuery.data,
      showLevelFilter,
    ],
  );

  if (
    descriptionQuery.isLoading ||
    indicatorDataQuery.isLoading ||
    residentDataQuery.isLoading
  ) {
    return SkeletonRow(colspan);
  }

  if (
    descriptionQuery.isError ||
    indicatorDataQuery.isError ||
    residentDataQuery.isError
  ) {
    return null;
  }

  const medicalFieldClass = medicalFieldFilter.includes(registerName.rname)
    ? ""
    : style.filterMedField;

  const indicatorRows = uniqueOrderedInd.map((indicator) => {
    const singleIndicatorData = indicatorDataQuery.data.filter(
      (data: Indicator) => data.ind_id === indicator,
    );
    const singleIndicatorDescription = descriptionQuery.data.find(
      (data: Description) => data.id === indicator,
    );
    return (
      <IndicatorRow
        context={queryContext}
        indicatorData={singleIndicatorData}
        description={singleIndicatorDescription}
        key={indicator}
        unitNames={props.unitNames}
        medicalFieldClass={medicalFieldClass}
        showLevelFilter={showLevelFilter}
        colspan={colspan}
        treatmentYear={treatmentYear}
        chartColours={chartColours}
      />
    );
  });

  // Check if the registry has data. The table block is not shown in the absence of data.
  const showTitle = uniqueOrderedInd.length !== 0;

  // If the page shows caregivers and the registry has data for residents,
  // then the table block should be shown with a message.
  let showTitleAnyway = false;

  // Filter on treatment year
  let filteredResidentData = residentDataQuery.data.filter(
    (row: ResidentData) => row.year === treatmentYear,
  );

  // Filter on level if selected
  if (showLevelFilter) {
    filteredResidentData = residentDataQuery.data.filter(
      (row: ResidentData) => row.level === showLevelFilter,
    );
  }

  // Check if national is the only unit
  if (
    context === "caregiver" &&
    !showTitle &&
    medicalFieldFilter.includes(registerName.rname)
  ) {
    if (unitNames.length === 1 && unitNames[0] === "Nasjonalt") {
      filteredResidentData = filteredResidentData.filter(
        (row: ResidentData) =>
          row.year === treatmentYear && unitNames.includes(row.unitName),
      );
    } else {
      // If not, exclude national from the filter since the indicators shown are governed by the treatment units
      const unitNamesExceptNational = unitNames.filter(
        (row) => row !== "Nasjonalt",
      );
      filteredResidentData = filteredResidentData.filter(
        (row: ResidentData) =>
          row.year === treatmentYear &&
          unitNamesExceptNational.includes(row.unitName),
      );
    }

    if (filteredResidentData.length > 0) {
      showTitleAnyway = true;
    }
  }

  return (
    <>
      {blockTitle && (showTitle || showTitleAnyway) ? (
        <TableBlockTitle
          link={`behandlingskvalitet/${registerName.rname}`}
          title={blockTitle}
          colspan={colspan}
          tr_register_name_class={`${trRegisterNameClass} ${registerName.rname} ${medicalFieldClass}`}
        />
      ) : null}
      {indicatorRows}
      {showTitleAnyway && (
        <TableRow>
          <TableCell colSpan={colspan} sx={{ padding: 0 }}>
            <Box margin="0.5rem">
              <Stack spacing={"0.5rem"}>
                <div style={{ fontSize: "1.25rem", fontWeight: "normal" }}>
                  Registeret har data på opptaksområde
                </div>
                <div style={{ fontSize: "0.875rem", color: "#7d8588" }}>
                  Velg "Opptaksområder" øverst i filtermenyen til venstre for å
                  se disse dataene.
                </div>
                <div style={{ fontSize: "0.875rem" }}>
                  <Link href={"/behandlingskvalitet/" + registerName.rname}>
                    År og opptaksområder med data vises her.
                  </Link>
                </div>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableBlock;
