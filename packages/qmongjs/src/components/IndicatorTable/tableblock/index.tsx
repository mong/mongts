import { useMemo, useEffect, useRef } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import style from "./tableblock.module.css";
import { useDescriptionQuery, useIndicatorQuery } from "../../../helpers/hooks";
import { filterOrderIndID } from "../../../helpers/functions";
import { IndicatorRow } from "../indicatorrow";
import { TableBlockTitle } from "./tableblocktitle";
import { Description, Indicator, RegisterName } from "types";
import { IndicatorTableSkeleton } from "../IndicatorTableSkeleton";
import { TableRow } from "@mui/material";

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
}

const SkeletonRow = (
  <TableRow>
    <IndicatorTableSkeleton nRows={1} />
  </TableRow>
);

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
    onEmptyStatusChanged,
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
  const { isFetching } = indicatorDataQuery;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const descriptionQuery: UseQueryResult<any, unknown> = useDescriptionQuery({
    registerShortName: registerName.rname,
  });

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

  const isEmptyRef = useRef(false);

  useEffect(() => {
    if (
      !descriptionQuery.isLoading &&
      !indicatorDataQuery.isLoading &&
      !descriptionQuery.isError &&
      !indicatorDataQuery.isError
    ) {
      const isEmpty =
        descriptionQuery.data.length === 0 ||
        indicatorDataQuery.data.length === 0;

      if (isEmpty !== isEmptyRef.current) {
        isEmptyRef.current = isEmpty;
        onEmptyStatusChanged?.(registerName.rname, isEmpty);
      }
    }
  }, [
    descriptionQuery.isLoading,
    indicatorDataQuery.isLoading,
    descriptionQuery.isError,
    indicatorDataQuery.isError,
    descriptionQuery.data,
    indicatorDataQuery.data,
    onEmptyStatusChanged,
    registerName.rname,
  ]);

  if (descriptionQuery.isLoading || indicatorDataQuery.isLoading) {
    return SkeletonRow;
  }

  if (descriptionQuery.isError || indicatorDataQuery.isError) {
    return null;
  }

  if (isEmptyRef.current) {
    return null;
  }

  const medicalFieldClass = medicalFieldFilter.includes(registerName.rname)
    ? ""
    : style.filterMedField;

  const indicatorRows = uniqueOrderedInd.map((indicator) => {
    const singleIndicatorData = indicatorDataQuery.data.filter(
      (data: Indicator) => data.ind_id === indicator,
    );
    const singleIndicatorDescription = descriptionQuery.data.filter(
      (data: Description) => data.id === indicator,
    );
    return (
      <IndicatorRow
        context={queryContext}
        indicatorData={singleIndicatorData}
        description={singleIndicatorDescription[0]}
        key={indicator}
        unitNames={props.unitNames}
        medicalFieldClass={medicalFieldClass}
        showLevelFilter={showLevelFilter}
        colspan={colspan}
        treatmentYear={treatmentYear}
      />
    );
  });

  const tabName =
    dataQuality && registerName.dg_data
      ? "datakvalitet"
      : context === "caregiver" && registerName.caregiver_data
        ? "sykehus"
        : context === "resident" && registerName.resident_data
          ? "opptaksomraade"
          : "sykehus";

  return (
    <>
      {blockTitle && uniqueOrderedInd.length !== 0 ? (
        <TableBlockTitle
          tabName={tabName}
          link={`kvalitetsregistre/${registerName.rname}`}
          title={blockTitle}
          colspan={colspan}
          tr_register_name_class={`${trRegisterNameClass} ${registerName.rname} ${medicalFieldClass}`}
        />
      ) : null}
      {indicatorRows}
    </>
  );
};

export default TableBlock;
