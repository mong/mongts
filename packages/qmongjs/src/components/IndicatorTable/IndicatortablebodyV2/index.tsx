import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Indicator, RegisterData, IndicatorData } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import { newLevelSymbols, level2, skdeTheme } from "qmongjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PluggableList } from "react-markdown/lib";
import { Skeleton, Collapse, Typography, Stack } from "@mui/material";
import {
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledTableCellStart,
  StyledTableCellMiddle,
  StyledTableCellEnd,
} from "./IndicatorTableBodyV2Styles";
import { customFormat, useIndicatorQuery } from "qmongjs";
import { ChartRow } from "../chartrow";
import { getLastCompleteYear } from "../../../helpers/functions";

const remarkPlugins: PluggableList = [remarkGfm];

// ###########################
// ########## Types ##########
// ###########################

type IndicatorTableBodyV2Props = {
  context: string;
  type: string;
  year: number;
  unitNames: string[];
  levels: string;
  medfields: string[];
  chartColours: string[];
};

// ################################
// ########## Components ##########
// ################################

// #############################
// Component for individual rows
// #############################

const IndicatorRow = (props: {
  unitNames: string[];
  levels: string;
  indData: IndicatorData;
  chartData: Indicator[];
  rowID: string;
  openRowID: string;
  registryName: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
}) => {
  const {
    unitNames,
    levels,
    indData,
    chartData,
    rowID,
    openRowID,
    setOpenRowID,
    registryName,
    context,
    type,
    year,
    chartColours,
  } = props;

  let open: boolean;

  if (openRowID === "") {
    open = false;
  } else if (openRowID === rowID) {
    open = true;
  } else {
    open = false;
  }

  const onClick = () => {
    if (!open) {
      open = true;
      setOpenRowID(rowID);
    } else {
      open = false;
      setOpenRowID("");
    }
  };

  const format = indData.format === null ? ",.0%" : indData.format;

  if (indData.data === undefined) {
    return null;
  }

  const rowData = indData.data.map((row) => {
    return {
      unitName: row.unitName,
      result: row.var !== null ? customFormat(format)(row.var) : undefined,
      symbol: newLevelSymbols(level2(indData, row), Math.random().toString()),
      showCell:
        levels === undefined
          ? true
          : level2(indData, row) == null
            ? true
            : level2(indData, row) === levels,
      numerator:
        row.var !== null ? Math.round(row.var * row.denominator) : undefined,
      denominator: row.denominator,
      minDenominator: indData.minDenominator,
      dg: row.dg,
    };
  });

  // Get the units in the right order
  const rowDataSorted = unitNames.map((row) => {
    return rowData.find((item) => item.unitName === row);
  });

  const EmptyRow = (
    <TableRow key={indData.indicatorID + "-collapse"}>
      <StyledTableCell
        style={{
          paddingBottom: "0.25rem",
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: skdeTheme.palette.background.paper,
        }}
        colSpan={unitNames.length + 1}
      ></StyledTableCell>
    </TableRow>
  );

  let levelSign = "";

  if (indData.levelGreen != null) {
    if (indData.levelDirection === 1 && indData.levelGreen < 1) {
      levelSign = "≥";
    } else if (indData.levelDirection === 0 && indData.levelGreen > 0) {
      levelSign = "≤";
    }
  }

  const description = {
    id: indData.indicatorID,
    dg_id: null,
    include: null,
    title: null,
    name: null,
    type: indData.indType,
    sformat: indData.format ? indData.format : "",
    measure_unit: null,
    min_denominator: null,
    min_value: null,
    max_value: null,
    level_green: indData.levelGreen,
    level_yellow: indData.levelYellow,
    level_direction: indData.levelDirection,
    short_description: indData.shortDescription,
    long_description: indData.longDescription,
    registry_id: indData.registerID,
    rname: null,
    full_name: registryName,
  };

  return (
    <React.Fragment key={indData.indicatorTitle + "-indicatorSection"}>
      <StyledTableRow
        key={indData.indicatorTitle + "-mainrow"}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <StyledTableCellStart key={indData.indicatorID}>
          <Stack direction="row" alignItems="center">
            <IconButton
              aria-label="expand"
              size="small"
              sx={{ width: "2.5em", height: "2.5em" }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            {indData.indicatorTitle}
          </Stack>
        </StyledTableCellStart>

        {rowDataSorted.map((row, index, arr) => {
          const lowDG = row?.dg == null ? false : row?.dg < 0.6 ? true : false;
          const noData = row?.denominator == null ? true : false;
          const lowN =
            row?.denominator == null
              ? false
              : row.minDenominator == null
                ? false
                : row.denominator < row.minDenominator
                  ? true
                  : false;

          const cellAlpha = 0.3;
          const cellOpacity =
            levels === undefined
              ? 1
              : levels !== undefined && lowDG
                ? cellAlpha
                : row?.showCell && !lowDG
                  ? 1
                  : cellAlpha;

          const cellData = Array.from([lowDG, noData, lowN]).every(
            (x) => x == false,
          ) ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing="0.25rem"
            >
              <b>{row?.result}</b>
              {row?.symbol}
            </Stack>
          ) : null;

          const patientCounts = lowDG
            ? "Lav dekning"
            : lowN
              ? "Lite data"
              : noData
                ? "Ingen data"
                : row?.numerator + " av " + row?.denominator;

          let CellType;

          if (index === arr.length - 1) {
            CellType = StyledTableCellEnd;
          } else {
            CellType = StyledTableCellMiddle;
          }

          return (
            <CellType
              sx={{ opacity: cellOpacity }}
              align={"center"}
              key={indData.indicatorID + index}
            >
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                {cellData}
                {patientCounts}
              </Stack>
            </CellType>
          );
        })}
      </StyledTableRow>

      {!open ? EmptyRow : null}

      <TableRow>
        <StyledTableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: "white",
          }}
          colSpan={unitNames.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="body2" sx={{ margin: "2rem" }}>
              <p>{indData.shortDescription}</p>
              <p>
                {"Ønsket målnivå: "}
                {indData.levelGreen === null ? (
                  <b>{"Ikke oppgitt"}</b>
                ) : (
                  <b>{levelSign + customFormat(",.0%")(indData.levelGreen)}</b>
                )}
                <br />
                {"Lavt målnivå: "}
                {indData.levelYellow === null ? (
                  <b>{"Ikke oppgitt"}</b>
                ) : (
                  <b>
                    {(indData.levelDirection === 1 ? "<" : ">") +
                      customFormat(",.0%")(indData.levelYellow)}
                  </b>
                )}
              </p>
              <p>
                {"Siste levering av data: " +
                  (indData.data[0].deliveryTime === null
                    ? "Ikke oppgitt"
                    : new Date(indData.data[0].deliveryTime).toLocaleString(
                        "no-NO",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          timeZone: "CET",
                        },
                      ))}
              </p>
            </Typography>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <table width={1500}>
                <tbody>
                  <ChartRow
                    context={{ context: context, type: type }}
                    colspan={1}
                    treatmentYear={year}
                    indicatorData={chartData.filter(
                      (chartDataRow: Indicator) => {
                        return chartDataRow.year === year;
                      },
                    )}
                    selectedTreatmentUnits={unitNames}
                    update_selected_row={onClick}
                    description={description}
                    showDescription={false}
                    lastCompleteYear={getLastCompleteYear(
                      indData.data[0].affirmTime,
                      year,
                    )}
                    chartColours={chartColours}
                  ></ChartRow>
                </tbody>
              </table>
            </div>

            <Typography variant="body2" sx={{ margin: "2rem" }}>
              <b>Om kvalitetsindikatoren</b>
              <ReactMarkdown
                remarkPlugins={remarkPlugins}
                components={{
                  p({ children }) {
                    return <p style={{ margin: 0 }}>{children}</p>;
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target={href?.startsWith("#") ? "_self" : "_blank"}
                        rel="noreferrer"
                        style={{ color: "#006492" }}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {indData.longDescription}
              </ReactMarkdown>
            </Typography>
          </Collapse>
        </StyledTableCell>
      </TableRow>

      {open ? EmptyRow : null}
    </React.Fragment>
  );
};

// ###################################################
// Component for collection of indicators per registry
// ###################################################

const IndicatorSection = (props: {
  unitNames: string[];
  levels: string;
  data: IndicatorData[];
  chartData: Indicator[];
  openRowID: string;
  registryName: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
}) => {
  const {
    unitNames,
    levels,
    data,
    chartData,
    openRowID,
    setOpenRowID,
    registryName,
    context,
    type,
    year,
    chartColours,
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
        levels={levels}
        indData={indDataRow}
        chartData={chartData.filter((chartDataRow: Indicator) => {
          return chartDataRow.ind_id === indDataRow.indicatorID;
        })}
        rowID={indDataRow.indicatorID}
        openRowID={openRowID}
        setOpenRowID={setOpenRowID}
        registryName={registryName}
        context={context}
        type={type}
        year={year}
        chartColours={chartColours}
      />
    ) : null;

    return returnVal;
  });
};

// ################################################################
// Component for registry and unit names header plus indicator rows
// ################################################################

const RegistrySection = (props: {
  unitNames: string[];
  levels: string;
  regData: RegisterData;
  chartData: Indicator[];
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
}) => {
  const {
    unitNames,
    levels,
    regData,
    chartData,
    openRowID,
    setOpenRowID,
    context,
    type,
    year,
    chartColours,
  } = props;

  regData.indicatorData.sort((a: IndicatorData, b: IndicatorData) => {
    return a.sortingName === b.sortingName
      ? 0
      : a.sortingName === null
        ? 1
        : b.sortingName === null
          ? -1
          : a.sortingName < b.sortingName
            ? -1
            : 1;
  });

  let showSection;

  if (levels === undefined) {
    showSection = true;
  } else {
    showSection = !regData.indicatorData
      .map((indRow) => {
        return indRow.data
          ? !indRow.data
              .map((dataRow) => {
                return level2(indRow, dataRow) === levels;
              })
              .every((x) => x == false)
          : null;
      })
      .every((x) => x == false);
  }

  if (showSection) {
    return (
      <React.Fragment>
        <TableHead>
          <TableRow key={regData.registerName + "-row"}>
            <StyledTableCellStart
              key={regData.registerName}
              sx={{
                backgroundColor: skdeTheme.palette.secondary.light,
                width: "12rem",
              }}
            >
              {regData.registerFullName}
            </StyledTableCellStart>

            {unitNames.map((row, index, arr) => {
              let CellType;

              if (index === arr.length - 1) {
                CellType = StyledTableCellEnd;
              } else {
                CellType = StyledTableCellMiddle;
              }

              return (
                <CellType
                  align="center"
                  key={regData.registerName + index}
                  sx={{ backgroundColor: skdeTheme.palette.secondary.light }}
                  width={"12rem"}
                >
                  {row}
                </CellType>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          <IndicatorSection
            key={regData.registerName}
            unitNames={unitNames}
            levels={levels}
            data={regData.indicatorData}
            chartData={chartData}
            openRowID={openRowID}
            setOpenRowID={setOpenRowID}
            registryName={regData.registerFullName}
            context={context}
            type={type}
            year={year}
            chartColours={chartColours}
          />
        </TableBody>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

// #################################
// Top level component for the table
// #################################

export const IndicatorTableBodyV2 = (props: IndicatorTableBodyV2Props) => {
  const { context, type, year, unitNames, levels, medfields, chartColours } =
    props;

  const [openRowID, setOpenRowID] = useState<string>("");

  const queryParams: FetchIndicatorParams = {
    context: context,
    unitNames: unitNames,
    type: type,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
    treatmentYear: year,
  });

  if (indicatorQuery.isFetching || nestedDataQuery.isFetching) {
    return <Skeleton variant="rectangular" width={"100%"} height={2000} />;
  }

  const chartData = indicatorQuery.data as Indicator[];

  const rowData = nestedDataQuery.data as RegisterData[];

  const rowDataFiltered = rowData.filter((row) => {
    return medfields.includes(row.registerName);
  });
  rowDataFiltered.sort((a: RegisterData, b: RegisterData) => {
    return (
      Math.min(...a.medfieldID) - Math.min(...b.medfieldID) ||
      (a.registerShortName === b.registerShortName
        ? 0
        : a.registerShortName < b.registerShortName
          ? -1
          : 1)
    );
  });

  return (
    <StyledTable sx={{ marginTop: "0.625rem" }}>
      {rowDataFiltered.map((row) => (
        <RegistrySection
          key={row.registerName}
          levels={levels}
          unitNames={props.unitNames}
          regData={row}
          chartData={chartData.filter((chartDataRow: Indicator) => {
            return chartDataRow.registry_name === row.registerName;
          })}
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
