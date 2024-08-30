import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Indicator, RegisterData, IndicatorData } from "types";
import Button from "@mui/material/Button";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import { newLevelSymbols, level2 } from "qmongjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PluggableList } from "react-markdown/lib";
import { useScreenSize } from "@visx/responsive";
import {
  StyledTable,
  StyledTableRow,
  StyledTableCell,
} from "./IndicatorTableBodyV2Styles";
import {
  LinechartBase,
  BarchartBase,
  font,
  LinechartData,
  LineStyles,
  customFormat,
  useIndicatorQuery,
} from "qmongjs";

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
};

// ###############################
// ########## Functions ##########
// ###############################

const createChartData = (
  data: Indicator[],
  indID: string,
  unitNames: string[],
) => {
  const indData = data.filter((row) => {
    return row.ind_id === indID;
  });

  const chartData = unitNames.map((unitNamesRow) => {
    const unitIndData = indData.filter((indDataRow) => {
      return indDataRow.unit_name === unitNamesRow;
    });
    return unitIndData.map((row) => {
      return {
        id: row.id,
        x: new Date(row.year, 0),
        y: row.var,
      } as LinechartData;
    });
  });

  // The same indicator can appear twice if it belongs to two different medfields
  const chartDataUnique = chartData.map((array) => {
    return array.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        array.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });
  });

  return chartDataUnique;
};

const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const createChartStyles = (unitNames: string[], font: font) => {
  const lineStyles = unitNames.map((unitNameRow) => {
    const lineStyle = {
      text: unitNameRow,
      strokeDash: "0",
      colour: randomHexColorCode(),
    };

    return lineStyle;
  });

  return new LineStyles(lineStyles, font);
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
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    unitNames,
    levels,
    indData,
    chartData,
    rowID,
    openRowID,
    setOpenRowID,
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
      symbol: newLevelSymbols(level2(indData, row)),
      showCell:
        levels === ""
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

  const chartDataFiltered = createChartData(
    chartData,
    indData.indicatorID,
    unitNames,
  );

  const font = {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Plus Jakarta Sans",
  };

  const lineStyles = createChartStyles(unitNames, font);

  const ResponsiveChart = () => {
    const [showBars, setShowBars] = React.useState(false);

    const { width, height } = useScreenSize({ debounceTime: 150 });

    const sizeFactor = 0.5;

    const figure = showBars ? (
      <BarchartBase
        indicatorData={indData}
        width={sizeFactor * width * 0.7}
        height={sizeFactor * height}
        xTickFormat=",.0%"
      />
    ) : (
      <LinechartBase
        data={chartDataFiltered}
        width={sizeFactor * width}
        height={sizeFactor * height}
        yMin={0}
        yMax={1}
        lineStyles={lineStyles}
        yAxisText={{ text: "Andel", font: font }}
        format_y=",.0%"
        levelGreen={indData.levelGreen!}
        levelYellow={indData.levelYellow!}
        levelDirection={indData.levelDirection!}
        useTooltip={true}
        showLegend={true}
      />
    );

    const buttonText = showBars ? "Vis tidstrend" : "Vis alle sykehus";

    return (
      <>
        <Button
          variant="outlined"
          onClick={() => {
            setShowBars(!showBars);
          }}
        >
          {buttonText}
        </Button>
        <br />
        {figure}
      </>
    );
  };

  const responsiveChart = open ? <ResponsiveChart /> : null;

  return (
    <React.Fragment key={indData.indicatorTitle + "-indicatorSection"}>
      <StyledTableRow
        key={indData.indicatorTitle + "-mainrow"}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <StyledTableCell key={indData.indicatorID}>
          <table>
            <tbody>
              <tr>
                <td>
                  <IconButton
                    onClick={onClick}
                    aria-label="expand"
                    size="small"
                  >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </td>
                <td>{indData.indicatorTitle}</td>
              </tr>
            </tbody>
          </table>
        </StyledTableCell>

        {rowDataSorted.map((row, index) => {
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
            levels === ""
              ? 1
              : levels !== "" && lowDG
                ? cellAlpha
                : row?.showCell && !lowDG
                  ? 1
                  : cellAlpha;

          const cellData = Array.from([lowDG, noData, lowN]).every(
            (x) => x == false,
          )
            ? [row?.result, row?.symbol]
            : "N/A";

          const patientCounts = lowDG
            ? "Lav dekning"
            : lowN
              ? "Lite data"
              : noData
                ? "Ingen data"
                : row?.numerator + " av " + row?.denominator;

          return (
            <StyledTableCell
              sx={{ opacity: cellOpacity }}
              align={"center"}
              key={indData.indicatorID + index}
            >
              {cellData}
              <br />
              {patientCounts}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>

      <TableRow
        key={indData.indicatorID + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <StyledTableCell key={indData.indicatorID + "-shortDescription"}>
          {indData.shortDescription}
        </StyledTableCell>
        <StyledTableCell
          key={indData.indicatorTitle + "-targetLevel"}
          colSpan={unitNames.length}
          align="center"
          style={{ backgroundColor: "#E0E7EB" }}
        >
          {"Ønsket målnivå: " +
            (indData.levelGreen === null
              ? ""
              : customFormat(",.0%")(indData.levelGreen))}
        </StyledTableCell>
      </TableRow>

      <TableRow
        key={indData.indicatorID + "-charts"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <StyledTableCell
          key={indData.indicatorID + "-charts"}
          colSpan={unitNames.length + 1}
          align="center"
        >
          {responsiveChart}
        </StyledTableCell>
      </TableRow>

      <StyledTableRow
        key={indData.indicatorTitle + "-description"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <StyledTableCell
          key={indData.indicatorTitle + "-decription"}
          colSpan={unitNames.length + 1}
        >
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
        </StyledTableCell>
      </StyledTableRow>
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
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { unitNames, levels, data, chartData, openRowID, setOpenRowID } = props;

  // Map indicators to rows and show only rows where there is at least
  // one indicator not removed by the filter
  return data.map((indDataRow) => {
    const showRow =
      levels === ""
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
        chartData={chartData}
        rowID={indDataRow.indicatorID}
        openRowID={openRowID}
        setOpenRowID={setOpenRowID}
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
}) => {
  const { unitNames, levels, regData, chartData, openRowID, setOpenRowID } =
    props;

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

  if (levels === "") {
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
            <StyledTableCell key={regData.registerName}>
              {regData.registerFullName}
            </StyledTableCell>

            {unitNames.map((row, index) => {
              return (
                <StyledTableCell
                  align="center"
                  key={regData.registerName + index}
                >
                  {row}
                </StyledTableCell>
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
  const { context, type, year, unitNames, levels, medfields } = props;

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
    return null;
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
    <StyledTable>
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
        />
      ))}
    </StyledTable>
  );
};
