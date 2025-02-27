import { ItemBox } from "../HospitalProfileStyles";
import { indicatorsPerHospital, indicatorInfo } from "./indicators";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { newLevelSymbols, useIndicatorQuery } from "qmongjs";
import { Indicator } from "types";
import { customFormat } from "qmongjs";
import { level } from "qmongjs";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const colourMap = new Map();
colourMap.set("H", "#58A55C");
colourMap.set("M", "#FD9C00");
colourMap.set("L", "#D85140");
colourMap.set(undefined, undefined);

const IndicatorRow = (
  indId: string,
  rowNumber: number,
  lastYear: number,
  data: Indicator[],
) => {
  const indInfo = indicatorInfo.filter((row) => row.indId === indId)[0];

  const point1 = data.filter((row) => {
    return row.ind_id === indId && row.year === lastYear - 1;
  });
  const point2 = data.filter((row) => {
    return row.ind_id === indId && row.year === lastYear;
  });

  const var1 = point1[0] ? point1[0].var : undefined;
  const var2 = point2[0] ? point2[0].var : undefined;

  const level1 = point1[0] ? level(point1[0]) : undefined;
  const level2 = point2[0] ? level(point2[0]) : undefined;

  return (
    <TableRow key={rowNumber}>
      <TableCell>
        <b>{"Indikator " + rowNumber}</b>
      </TableCell>
      <TableCell>{indInfo.title}</TableCell>
      <TableCell align="right">
        {point1[0] ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Typography variant="body2">
              {customFormat(point1[0].sformat)(var1)}
            </Typography>
            {newLevelSymbols(level1)}
          </Stack>
        ) : (
          <ErrorOutlineIcon />
        )}
      </TableCell>
      <TableCell align="right">
        {point2[0] ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Typography variant="body2">
              {customFormat(point1[0].sformat)(var2)}
            </Typography>
            {newLevelSymbols(level2)}
          </Stack>
        ) : (
          <ErrorOutlineIcon />
        )}
      </TableCell>
    </TableRow>
  );
};

type SelectedIndicatorTableProps = {
  unitName: string;
  titlePadding: number;
  titleStyle: { marginTop: number; marginLeft: number };
  lastYear: number;
};

export const SelectedIndicatorTable = (props: SelectedIndicatorTableProps) => {
  const { unitName, titlePadding, titleStyle, lastYear } = props;

  const selectedIndicators = indicatorsPerHospital.filter(
    (row) => row.unit === unitName,
  );

  if (selectedIndicators.length < 1) {
    return null;
  }

  const selectedIndIds = selectedIndicators[0].commonInd.concat(
    selectedIndicators[0].specificInd,
  );
  // Fetch aggregated data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const indicatorQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    unitNames: [unitName],
    context: "caregiver",
    type: "ind",
  });

  if (indicatorQuery.isFetching) {
    return null;
  }

  const data = indicatorQuery.data
    .filter((row: Indicator) => [lastYear - 1, lastYear].includes(row.year))
    .filter((row: Indicator) => selectedIndIds.includes(row.ind_id))
    .filter((row: Indicator) => row.dg >= 0.6 || row.dg === null); // TODO: filter out dg = null?

  const CommonIndTable = (
    <>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell colSpan={2} align="center">
            <b>{"Andel"}</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} align="center">
            <b>{"Felles indikatorer"}</b>
          </TableCell>
          <TableCell align="center">
            <b>{lastYear - 1}</b>
          </TableCell>
          <TableCell align="center">
            <b>{lastYear}</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicators[0].commonInd.map((row, index) =>
          IndicatorRow(row, index + 1, lastYear, data),
        )}
      </TableBody>
    </>
  );

  const SpecificIndTable = (
    <>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} align="center">
            <b>{"Sykehusspesifikke indikatorer"}</b>
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicators[0].specificInd.map((row, index) =>
          IndicatorRow(
            row,
            index + selectedIndicators[0].commonInd.length + 1,
            lastYear,
            data,
          ),
        )}
      </TableBody>
    </>
  );

  return (
    <ItemBox>
      <Box padding={titlePadding}>
        <Typography variant="h5" style={titleStyle}>
          <b>Utvalgte indikatorer</b>
        </Typography>
        <Table>
          {CommonIndTable}
          {selectedIndicators[0].specificInd.length > 0 && SpecificIndTable}
        </Table>
      </Box>
    </ItemBox>
  );
};
