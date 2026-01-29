import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RegisterData, IndicatorData, OptsTu } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  FetchIndicatorParams,
  useUnitNamesQuery,
} from "../../../helpers/hooks";
import { newLevelSymbols, level2, skdeTheme } from "qmongjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChartRowV2 } from "../chartrowV2";

const remarkPlugins = [remarkGfm];

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
  medfield: string;
  levels: string;
  indData: IndicatorData;
  rowID: string;
  openRowID: string;
  registryName: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
  treatmentUnitsByLevel: OptsTu[];
}) => {
  const {
    unitNames,
    levels,
    indData,
    rowID,
    openRowID,
    setOpenRowID,
    context,
    type,
    year,
    treatmentUnitsByLevel,
    medfield,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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
      params.set("selected_row", rowID);
      setOpenRowID(rowID);
    } else {
      open = false;
      params.delete("selected_row");
      setOpenRowID("");
    }
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  };

  const format = indData.format === null ? ",.0%" : indData.format;
  const indType = indData.indType;

  if (indData.data === undefined) {
    return null;
  }

  const rowData = indData.data
    .filter((row) => row.year == year)
    .map((row) => {
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

  let levelSignHigh = "";

  if (indData.levelGreen != null) {
    if (indData.levelDirection === 1 && indData.levelGreen < 1) {
      levelSignHigh = "≥";
    } else if (indData.levelDirection === 0 && indData.levelGreen > 0) {
      levelSignHigh = "≤";
    }
  }

  let levelSignLow = "";

  if (indData.levelYellow != null) {
    if (indData.levelDirection === 1 && indData.levelYellow > 0) {
      levelSignLow = "<";
    } else if (indData.levelDirection === 0 && indData.levelYellow < 1) {
      levelSignLow = ">";
    }
  }

  const indFormat = indData.format ? indData.format : ",.0%";

  const CollapseContent = (props: { open: boolean }) => {
    const { open } = props;

    if (!open || indData.data === undefined) {
      return null;
    } else {
      return (
        <React.Fragment>
          <Typography variant="body2" sx={{ margin: "2rem" }}>
            {indData.shortDescription}
            <br />
            <br />
            {"Ønsket målnivå: "}
            {indData.levelGreen === null ? (
              <b>{"Ikke oppgitt"}</b>
            ) : (
              <b>
                {levelSignHigh + customFormat(indFormat)(indData.levelGreen)}
              </b>
            )}
            <br />
            {"Lavt målnivå: "}
            {indData.levelYellow === null ? (
              <b>{"Ikke oppgitt"}</b>
            ) : (
              <b>
                {levelSignLow + customFormat(indFormat)(indData.levelYellow)}
              </b>
            )}
            <br />
            <br />
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
          </Typography>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <table width={1500}>
              <tbody>
                <tr>
                  <td colSpan={unitNames.length + 1}>
                    <ChartRowV2
                      data={indData}
                      unitNames={unitNames}
                      medfield={medfield}
                      context={context}
                      type={type}
                      year={year}
                      treatmentUnitsByLevel={treatmentUnitsByLevel}
                      indID={rowID}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="body2" sx={{ margin: "2rem" }}>
            <b>Om kvalitetsindikatoren</b>
          </Typography>
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            components={{
              p({ children }) {
                return (
                  <Typography variant="body2" sx={{ margin: "2rem" }}>
                    {children}
                  </Typography>
                );
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
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment key={indData.indicatorTitle + "-indicatorSection"}>
      <StyledTableRow
        key={indData.indicatorTitle + "-mainrow"}
        onClick={onClick}
        style={{ cursor: "pointer" }}
        id={rowID}
      >
        <StyledTableCellStart key={indData.indicatorID}>
          <Stack direction="row" alignItems="center">
            <IconButton
              aria-label="expand"
              size="small"
              sx={{ width: "2.5em", height: "2.5em" }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <div lang="no" style={{ wordWrap: "break-word", hyphens: "auto" }}>
              {indData.indicatorTitle}
            </div>
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

          const lowCountText =
            "Færre observasjoner enn " +
            (row?.minDenominator ? row.minDenominator : 5);

          const patientCounts = lowDG
            ? "Lav dekning"
            : lowN
              ? lowCountText
              : noData
                ? "Ingen data"
                : indType === "andel"
                  ? row?.numerator + " av " + row?.denominator
                  : "";

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
          <Collapse in={open} timeout="auto" mountOnEnter>
            <CollapseContent open={open} />
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
}) => {
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

// ################################################################
// Component for registry and unit names header plus indicator rows
// ################################################################

const RegistrySection = (props: {
  unitNames: string[];
  levels: string;
  medfield: string;
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
    medfield,
    openRowID,
    setOpenRowID,
    context,
    type,
    year,
    chartColours,
  } = props;

  const queryParams: FetchIndicatorParams = {
    context: context,
    registerShortName: medfield, // Not the same as the short_name column in the database
    unitNames: unitNames,
    type: type,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesByLevelQuery = useUnitNamesQuery(medfield, context, type);

  if (nestedDataQuery.isFetching || unitNamesByLevelQuery.isFetching) {
    return <Skeleton variant="rectangular" width={"100%"} height={2000} />;
  }

  const treatmentUnitsByLevel = unitNamesByLevelQuery.data.opts_tu as OptsTu[];

  const rowData = nestedDataQuery.data as RegisterData[];

  rowData.sort((a: RegisterData, b: RegisterData) => {
    return (
      Math.min(...a.medfieldID) - Math.min(...b.medfieldID) ||
      (a.registerShortName === b.registerShortName
        ? 0
        : a.registerShortName < b.registerShortName
          ? -1
          : 1)
    );
  });

  const regData = rowData[0];

  if (!regData || !regData.indicatorData) {
    return null;
  }

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

  // Sjekk om hele registerseksjonen skal filtreres bort på grunn av målnivåfilter
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
              <div
                lang="no"
                style={{ wordWrap: "break-word", hyphens: "auto" }}
              >
                {regData.registerFullName}
              </div>
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
                  <div
                    lang="no"
                    style={{ wordWrap: "break-word", hyphens: "auto" }}
                  >
                    {row}
                  </div>
                </CellType>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          <IndicatorSection
            key={regData.registerName}
            unitNames={unitNames}
            medfield={medfield}
            levels={levels}
            data={regData.indicatorData}
            openRowID={openRowID}
            setOpenRowID={setOpenRowID}
            registryName={regData.registerFullName}
            context={context}
            type={type}
            year={year}
            chartColours={chartColours}
            treatmentUnitsByLevel={treatmentUnitsByLevel}
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
