import React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Indicator } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import { newLevelSymbols, level } from "qmongjs";

import {
  LinechartBase,
  font,
  LinechartData,
  LineStyles,
  customFormat,
  useIndicatorQuery,
} from "qmongjs";

export type IndicatorTableBodyV2Props = {
  context: string;
  type: string;
  year: number;
  unitNames: string[];
  levels: "H" | "M" | "L" | "";
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
};

type IndicatorData = {
  indicatorID: string;
  indicatorName: string | null;
  targetMeasure: number | null;
  shortDescription: string | null;
  longDescription: string | null;
  sortingName: string | null;
  data: DataPoint[];
};

type RegisterData = {
  registerName: string;
  registerShortName: string;
  registerID: number;
  medfieldID: number;
  indicatorData: IndicatorData[];
};

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
          registerName: row.registry_full_name,
          registerShortName: row.registry_name,
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
          targetMeasure: row.level_green,
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

// Component for individual rows
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

  return (
    <React.Fragment key={indData.indicatorName}>
      <TableRow
        key={indData.indicatorName + "-mainrow"}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <TableCell key={indData.indicatorName}>
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
        </TableCell>

        {rowDataSorted.map((row, index) => {
          return (
            <TableCell align={"center"} key={indData.indicatorID + index}>
              <table>
                <tbody>
                  <tr>
                    <td>{row?.showCell ? [row?.result, row.symbol] : null}</td>
                  </tr>
                  <tr>
                    <td>
                      {row?.showCell
                        ? row?.numerator + " av " + row?.denominator
                        : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow
        key={indData.indicatorName + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <TableCell key={indData.indicatorName + "-shortDescription"}>
          {indData.shortDescription}
        </TableCell>
        <TableCell
          key={indData.indicatorName + "-targetLevel"}
          colSpan={unitNames.length}
          align="center"
          style={{ backgroundColor: "#E0E7EB" }}
        >
          {"Ønsket målnivå: " +
            (indData.targetMeasure === null
              ? ""
              : customFormat(",.0%")(indData.targetMeasure))}
        </TableCell>
      </TableRow>

      <TableRow
        key={indData.indicatorName + "-charts"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <TableCell
          key={indData.indicatorName + "-charts"}
          colSpan={unitNames.length + 1}
          align="center"
        >
          <LinechartBase
            data={chartDataFiltered}
            width={1000}
            height={500}
            yMin={0}
            yMax={1}
            lineStyles={lineStyles}
            font={font}
            yAxisText={"Andel"}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// Component for collection of indicators per registry
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

    levels === "" ? showRow = true :
      indDataRow.data.map((dataPointRow) => level(dataPointRow) === levels).every(x => x === true) ?
      showRow = true : showRow = false;

     const returnVal = showRow ? 
      <IndicatorRow
      key={"IndicatorRow" + indDataRow.indicatorID}
      unitNames={unitNames}
      levels={levels}
      indData={indDataRow}
      chartData={chartData}
    /> : null

    return returnVal;
    } 
  )
};

// Component for registry and unit names header plus indicator rows
const RegistrySection = (props: {
  unitNames: string[];
  levels: string;
  regData: RegisterData;
  chartData: Indicator[];
}) => {
  const { unitNames, levels, regData, chartData } = props;

  return (
    <React.Fragment>
      <TableHead>
        <TableRow key={regData.registerName + "-row"}>
          <TableCell key={regData.registerName}>
            {regData.registerName}
          </TableCell>

          {unitNames.map((row, index) => {
            return (
              <TableCell align="center" key={regData.registerName + index}>
                {row}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>

      <TableBody>
        <IndicatorSection
          unitNames={unitNames}
          levels={levels}
          data={regData.indicatorData}
          chartData={chartData}
        />
      </TableBody>
    </React.Fragment>
  );
};

// Top level component for the table
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
      return row.year === year;
    }),
  );

  const chartData = indicatorQuery.data;

  const rowDataFiltered = rowData.filter((row) => {
    return medfields.includes(row.registerShortName);
  });

  return (
    <Table>
      {rowDataFiltered.map((row) => (
        <RegistrySection
          key={row.registerName}
          levels={levels}
          unitNames={props.unitNames}
          regData={row}
          chartData={chartData.filter((chartDataRow: Indicator) => {
            return chartDataRow.registry_name === row.registerShortName;
          })}
        />
      ))}
    </Table>
  );
};
