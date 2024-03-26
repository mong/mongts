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
import { useIndicatorQuery } from "qmongjs";
import { FetchIndicatorParams } from "../../../helpers/hooks";
import { customFormat } from "../../../helpers/functions";

export type IndicatorTableBodyV2Props = {
  context: string;
  type: string;
  year: number;
  registers: string[];
  unitNames: string[];
  level: string;
  medfields: string[];
};

type DataPoint = {
  unitName: string;
  var: number;
  numerator: number;
  denominator: number;
  format: string | null;
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
        });
      }

      return returnData;
    },
    [] as RegisterData[],
  );

  return regData;
};

const IndicatorSection = (props: {
  unitNames: string[];
  data: IndicatorData[];
}) => {
  const { unitNames, data } = props;

  // Map indicators to rows
  return data.map((indDataRow) => {
    const [open, setOpen] = React.useState(false);

    const rowData = indDataRow.data.map((row) => {
      const format = row.format === null ? ",.0%" : row.format;
      return { unitName: row.unitName, result: customFormat(format)(row.var) };
    });

    const rowDataSorted = unitNames.map((row) => {
      return rowData.find((item) => item.unitName === row)?.result;
    });

    return (
      <React.Fragment key={indDataRow.indicatorName}>
        <TableRow
          key={indDataRow.indicatorName + "-mainrow"}
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <TableCell key={indDataRow.indicatorName}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <IconButton
                      onClick={() => setOpen(!open)}
                      aria-label="expand"
                      size="small"
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </td>
                  <td>{indDataRow.indicatorName}</td>
                </tr>
              </tbody>
            </table>
          </TableCell>

          {rowDataSorted.map((row, index) => {
            return (
              <TableCell align={"center"} key={indDataRow.indicatorID + index}>
                {row}
              </TableCell>
            );
          })}
        </TableRow>

        <TableRow
          key={indDataRow.indicatorName + "-collapse"}
          sx={{ visibility: open ? "visible" : "collapse" }}
        >
          <TableCell key={indDataRow.indicatorName + "-shortDescription"}>
            {indDataRow.shortDescription}
          </TableCell>
          <TableCell
            key={indDataRow.indicatorName + "-targetLevel"}
            colSpan={unitNames.length}
            align="center"
          >
            {"Ønsket målnivå: " +
              (indDataRow.targetMeasure === null
                ? ""
                : customFormat(",.0%")(indDataRow.targetMeasure))}
          </TableCell>
        </TableRow>

        <TableRow
          key={indDataRow.indicatorName + "-charts"}
          sx={{ visibility: open ? "visible" : "collapse" }}
        >
          <TableCell
            key={indDataRow.indicatorName + "-charts"}
            colSpan={unitNames.length + 1}
            align="center"
          >
            Charts
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  });
};

const RegistrySection = (props: {
  unitNames: string[];
  regData: RegisterData;
}) => {
  const { unitNames, regData } = props;

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
        <IndicatorSection unitNames={unitNames} data={regData.indicatorData} />
      </TableBody>
    </React.Fragment>
  );
};

export const IndicatorTableBodyV2: React.FC<IndicatorTableBodyV2Props> = (
  props,
) => {
  const queryParams: FetchIndicatorParams = {
    context: props.context,
    treatmentYear: props.year,
    unitNames: props.unitNames,
    type: props.type,
  };
 
  const indicatorQuery: UseQueryResult<any, unknown> =
    useIndicatorQuery(queryParams);

  if (indicatorQuery.isFetching) {
    return null;
  }

  const rowData = createData(indicatorQuery.data);

  return (
    <Table>
      {rowData.map((row) => (
        <RegistrySection
          key={row.registerName}
          unitNames={props.unitNames}
          regData={row}
        />
      ))}
    </Table>
  );
};
