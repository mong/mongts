import React from "react";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Indicator } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import { newLevelSymbols, level } from "qmongjs";
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

export type IndicatorTableBodyV2Props = {
  context: string;
  type: string;
  year: number;
  unitNames: string[];
  levels: string;
  medfields: string[];
};

export type DataPoint = {
  unitName: string;
  var: number;
  numerator: number;
  denominator: number;
  format: string | null;
  level_direction: number | null;
  level_green: number | null;
  level_yellow: number | null;
  dg: number | null;
};

type IndicatorData = {
  indicatorID: string;
  indicatorName: string | null;
  levelGreen: number | null;
  levelYellow: number | null;
  levelDirection: number | null;
  minDenominator: number | null;
  shortDescription: string | null;
  longDescription: string | null;
  sortingName: string | null;
  data: DataPoint[];
};

type RegisterData = {
  registerFullName: string;
  registerName: string;
  registerShortName: string;
  registerID: number;
  medfieldID: number;
  indicatorData: IndicatorData[];
};

// ###############################
// ########## Functions ##########
// ###############################

// Find the index of the array element where the indicator ID is equal to the input string
const searchArray = (arr: Array<IndicatorData>, target: string) => {
  let i = 0;

  while (arr[i].indicatorID !== target) {
    i++;
  }

  return i;
};

const createData = (indicatorData: Indicator[]) => {
  const regData: RegisterData[] = indicatorData.reduce(
    (returnData: RegisterData[], row) => {
      // Initialise array
      const i = row.registry_id;

      // Add medfield to array if not already there
      if (!returnData[i]) {
        returnData[i] = {
          registerFullName: row.registry_full_name,
          registerName: row.registry_name,
          registerShortName: row.registry_short_name,
          registerID: row.registry_id,
          medfieldID: row.medfield_id,
          indicatorData: [] as IndicatorData[],
        };
      }

      // Add indicator to register and initialise if not already there
      if (
        !returnData[i].indicatorData
          .map((row) => {
            return row.indicatorID;
          })
          .includes(row.ind_id)
      ) {
        returnData[i].indicatorData.push({
          indicatorID: row.ind_id,
          indicatorName: row.ind_title,
          levelGreen: row.level_green,
          levelYellow: row.level_yellow,
          levelDirection: row.level_direction,
          minDenominator: row.min_denominator,
          shortDescription: row.ind_short_description,
          longDescription: row.ind_long_description,
          sortingName: row.ind_name,
          data: [] as DataPoint[],
        });
      }

      // Add data to indicator
      const j = searchArray(returnData[i].indicatorData, row.ind_id);

      if (
        // The same registry can belong to different medfields
        // If so, the unit will appear more than once
        // We therefore need to check if it is already there
        !returnData[i].indicatorData[j].data
          .map((row) => {
            return row.unitName;
          })
          .includes(row.unit_name)
      ) {
        returnData[i].indicatorData[j].data.push({
          unitName: row.unit_name,
          var: row.var,
          numerator: Math.round(row.var * row.denominator),
          denominator: row.denominator,
          format: row.sformat,
          level_direction: row.level_direction,
          level_green: row.level_green,
          level_yellow: row.level_yellow,
          dg: row.dg,
        });
      }

      return returnData;
    },
    [] as RegisterData[],
  );

  return regData;
};

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
      return { x: new Date(row.year, 0), y: row.var } as LinechartData;
    });
  });

  return chartData;
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
}) => {
  const { unitNames, levels, indData, chartData } = props;

  const [open, setOpen] = React.useState(false);

  const rowData = indData.data.map((row) => {
    const format = row.format === null ? ",.0%" : row.format;

    return {
      unitName: row.unitName,
      result: customFormat(format)(row.var),
      symbol: newLevelSymbols(level(row)),
      showCell:
        levels === ""
          ? true
          : level(row) == null
            ? true
            : level(row) === levels,
      numerator: Math.round(row.var * row.denominator),
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
    const { width, height } = useScreenSize({ debounceTime: 150 });

    const sizeFactor = 0.5;

    return (
      <LinechartBase
        data={chartDataFiltered}
        width={sizeFactor * width}
        height={sizeFactor * height}
        yMin={0}
        yMax={1}
        lineStyles={lineStyles}
        font={font}
        yAxisText={"Andel"}
        format_y=",.0%"
        levelGreen={indData.levelGreen!}
        levelYellow={indData.levelYellow!}
        levelDirection={indData.levelDirection!}
      />
    );
  };

  let responsiveChart;

  open ? (responsiveChart = <ResponsiveChart />) : (responsiveChart = null);

  return (
    <React.Fragment key={indData.indicatorName + "-indicatorSection"}>
      <StyledTableRow
        key={indData.indicatorName + "-mainrow"}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <StyledTableCell key={indData.indicatorID}>
          <table>
            <tbody>
              <tr>
                <td>
                  <IconButton
                    onClick={() => setOpen(!open)}
                    aria-label="expand"
                    size="small"
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </td>
                <td>{indData.indicatorName}</td>
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

          let cellData;
          Array.from([lowDG, noData, lowN]).every((x) => x == false)
            ? (cellData = [row?.result, row?.symbol])
            : (cellData = "N/A");

          let patientCounts;
          lowDG
            ? (patientCounts = "Lav dekning")
            : noData || lowN
              ? (patientCounts = "Lite data")
              : (patientCounts = row?.numerator + " av " + row?.denominator);

          return (
            <StyledTableCell
              sx={{ opacity: cellOpacity }}
              align={"center"}
              key={indData.indicatorID + index}
            >
              <div>{cellData}</div>
              <div>{patientCounts}</div>
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
          key={indData.indicatorName + "-targetLevel"}
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
        key={indData.indicatorName + "-description"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <StyledTableCell
          key={indData.indicatorName + "-decription"}
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
}) => {
  const { unitNames, levels, data, chartData } = props;

  // Map indicators to rows and show only rows where there is at least
  // one indicator not removed by the filter
  return data.map((indDataRow) => {
    let showRow;

    levels === ""
      ? (showRow = true)
      : indDataRow.data
            .map((dataPointRow) => level(dataPointRow) === levels)
            .every((x) => x === false)
        ? (showRow = false)
        : (showRow = true);

    const returnVal = showRow ? (
      <IndicatorRow
        key={"IndicatorRow" + indDataRow.indicatorID}
        unitNames={unitNames}
        levels={levels}
        indData={indDataRow}
        chartData={chartData}
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
}) => {
  const { unitNames, levels, regData, chartData } = props;

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
        return !indRow.data
          .map((dataRow) => {
            return level(dataRow) === levels;
          })
          .every((x) => x == false);
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

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (
  props,
) => {
  const { context, type, year, unitNames, levels, medfields } = props;

  const queryParams: FetchIndicatorParams = {
    context: context,
    unitNames: unitNames,
    type: type,
  };

  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const rowData = createData(
    indicatorQuery.data.filter((row: Indicator) => {
      return row.year === year && medfields.includes(row.registry_name);
    }),
  );

  const chartData = indicatorQuery.data;

  const rowDataFiltered = rowData.filter((row) => {
    return medfields.includes(row.registerName);
  });

  rowDataFiltered.sort((a: RegisterData, b: RegisterData) => {
    return (
      a.medfieldID - b.medfieldID ||
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
        />
      ))}
    </StyledTable>
  );
};
