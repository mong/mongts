import React from "react";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IndicatorData, OptsTu } from "types";
import { newestLevelSymbols, level2, skdeTheme } from "qmongjs";
import ReactMarkdown from "react-markdown";
import { Collapse, Typography, Stack } from "@mui/material";
import {
  StyledTableRow,
  StyledTableCell,
  StyledTableCellStart,
  StyledTableCellMiddle,
  StyledTableCellEnd,
} from "./IndicatorTableBodyV2Styles";
import { customFormat } from "qmongjs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChartRowV2 } from "../chartrowV2";
import remarkGfm from "remark-gfm";
import { StyledComponent } from "@emotion/styled";
import { TableCellProps } from "@mui/material";
import { MUIStyledCommonProps } from "@mui/system";

type IndicatorRowProps = {
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
};

export const IndicatorRow = (props: IndicatorRowProps) => {
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

  const remarkPlugins = [remarkGfm];

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
        level: level2(indData, row),
        symbol: newestLevelSymbols(
          level2(indData, row),
          Math.random().toString(),
        ),
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

  const indFormat = indData.format ? indData.format : ",.0%";

  const targetLevel = (
    <Typography variant="body2">
      {indData.levelGreen === null
        ? "Ikke oppgitt"
        : levelSignHigh + " " + customFormat(indFormat)(indData.levelGreen)}
    </Typography>
  );

  const lastDeliveryText =
    "Siste levering av data: " +
    (indData.data[0].deliveryTime === null
      ? "Ikke oppgitt"
      : new Date(indData.data[0].deliveryTime).toLocaleString("no-NO", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "CET",
        }));

  const CollapseContent = (props: { open: boolean }) => {
    const { open } = props;

    if (!open || indData.data === undefined) {
      return null;
    } else {
      return (
        <React.Fragment>
          <Typography variant="body2" sx={{ margin: "2rem" }}>
            {indData.shortDescription}
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
          <Typography variant="body2" sx={{ margin: "2rem" }}>
            {lastDeliveryText}
          </Typography>
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
        data-testid={"indicatorrow_" + indData.indicatorID}
      >
        <StyledTableCellStart
          key={indData.indicatorID}
          id={indData.indicatorID + "_scrollAnchor"}
        >
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
        <StyledTableCellMiddle>{targetLevel}</StyledTableCellMiddle>
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
          )
            ? (row?.level === "H"
                ? "Høy "
                : row?.level === "M"
                  ? "Middels "
                  : row?.level === "L"
                    ? "Lav "
                    : "") + row?.result
            : null;

          const lowCountText =
            "Færre enn " +
            (row?.minDenominator ? row.minDenominator : 5) +
            " observasjoner";

          const patientCounts = lowDG
            ? "Lav dekningsgrad"
            : lowN
              ? lowCountText
              : noData
                ? "Ingen data"
                : indType === "andel"
                  ? row?.numerator + " av " + row?.denominator
                  : "";

          let CellType: StyledComponent<TableCellProps & MUIStyledCommonProps>;

          if (index === arr.length - 1) {
            CellType = StyledTableCellEnd;
          } else {
            CellType = StyledTableCellMiddle;
          }

          return (
            <CellType
              sx={{ opacity: cellOpacity }}
              align={"left"}
              key={indData.indicatorID + index}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
              >
                {!lowDG && row?.symbol}
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <b>{cellData}</b>
                  <Typography variant="body2">{patientCounts}</Typography>
                </Stack>
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
          colSpan={unitNames.length + 2}
        >
          <Collapse
            in={open}
            timeout="auto"
            mountOnEnter
            onEnter={() => {
              const element = document.getElementById(
                indData.indicatorID + "_scrollAnchor",
              );
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              element &&
                element.scrollIntoView({ behavior: "instant", block: "start" });
            }}
          >
            <CollapseContent open={open} />
          </Collapse>
        </StyledTableCell>
      </TableRow>

      {open ? EmptyRow : null}
    </React.Fragment>
  );
};
