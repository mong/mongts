import { ItemBox } from "../HospitalProfileStyles";
import {
  indicatorsPerHospital,
  indicatorInfo,
} from "qmongjs/src/data/indicators";
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

const colourMap = new Map();
colourMap.set("H", "#58A55C");
colourMap.set("M", "#FD9C00");
colourMap.set("L", "#D85140");
colourMap.set(undefined, undefined);

const getLowDG = (point: Indicator) => {
  return point?.dg == null ? false : point?.dg < 0.6 ? true : false;
};

// Muligens unødvendig. Sjekk api-et.
const getNoData = (point: Indicator) => {
  return point?.denominator == null ? true : false;
};

const getLowN = (point: Indicator) => {
  return point?.denominator == null
    ? false
    : point.min_denominator == null && point.denominator < 5
      ? true
      : point.denominator < point.min_denominator
        ? true
        : false;
};

const IndicatorRow = (
  indId: string,
  rowNumber: number,
  lastYear: number,
  data: Indicator[],
) => {
  const indInfo = indicatorInfo.find((row) => row.indId === indId);

  const point1 = data.find((row) => {
    return row.ind_id === indId && row.year === lastYear - 1;
  });
  const point2 = data.find((row) => {
    return row.ind_id === indId && row.year === lastYear;
  });

  const var1 = point1 ? point1.var : undefined;
  const var2 = point2 ? point2.var : undefined;

  const level1 = point1 ? level(point1) : undefined;
  const level2 = point2 ? level(point2) : undefined;

  return (
    <TableRow key={rowNumber}>
      <TableCell sx={{ width: "8rem" }}>
        <b>{"Indikator " + rowNumber}</b>
      </TableCell>
      <TableCell>{indInfo.title}</TableCell>
      <TableCell>{indInfo.registry}</TableCell>
      <TableCell>
        <Stack direction="column" alignItems="center">
          <Stack direction="row-reverse" spacing={1} alignItems="center">
            {newLevelSymbols("H")}
            <Typography variant="body2">
              {customFormat(indInfo.sformat)(indInfo.level_green)}
            </Typography>
          </Stack>
          <Stack direction="row-reverse" spacing={1} alignItems="center">
            {newLevelSymbols("M")}
            <Typography variant="body2">
              {customFormat(indInfo.sformat)(indInfo.level_yellow)}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {point1 &&
        !getLowDG(point1) &&
        !getLowN(point1) &&
        !getNoData(point1) ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Typography variant="body2">
              {customFormat(point1.sformat)(var1)}
            </Typography>
            {newLevelSymbols(level1)}
          </Stack>
        ) : getLowDG(point1) ? (
          "Lav DG"
        ) : getNoData(point1) ? (
          "Ingen data"
        ) : getLowN(point1) ? (
          "Lav N"
        ) : (
          "Ingen data"
        )}
      </TableCell>
      <TableCell align="right">
        {point1 &&
        point2 &&
        !getLowDG(point2) &&
        !getLowN(point2) &&
        !getNoData(point2) ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Typography variant="body2">
              {customFormat(point2.sformat)(var2)}
            </Typography>
            {newLevelSymbols(level2)}
          </Stack>
        ) : getLowDG(point2) ? (
          "Lav DG"
        ) : getNoData(point2) ? (
          "Ingen data"
        ) : getLowN(point2) ? (
          "Lav N"
        ) : (
          "Ingen data"
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
  textMargin: number;
};

export const SelectedIndicatorTable = (props: SelectedIndicatorTableProps) => {
  const { unitName, titlePadding, titleStyle, lastYear, textMargin } = props;

  const selectedIndicator = indicatorsPerHospital.find(
    (row) => row.unit === unitName,
  );

  if (!selectedIndicator) {
    return null;
  }

  const selectedIndIds = selectedIndicator.commonInd.concat(
    selectedIndicator.specificInd,
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
          <TableCell colSpan={2} align="center">
            <b>{"Felles indikatorer"}</b>
          </TableCell>
          <TableCell>
            <b>{"Register"}</b>
          </TableCell>
          <TableCell align="center">
            <b>{"Ønsket målnivå"}</b>
          </TableCell>
          <TableCell align="right">
            <b>{lastYear - 1}</b>
          </TableCell>
          <TableCell align="right">
            <b>{lastYear}</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicator.commonInd.map((row, index) =>
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
          <TableCell colSpan={4}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicator.specificInd.map((row, index) =>
          IndicatorRow(
            row,
            index + selectedIndicator.commonInd.length + 1,
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
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {`Kvalitetsindikatorer til "Styringskrav og rammer 2025" Helse Nord.`}
          </Typography>
        </div>
        <Table>
          {CommonIndTable}
          {selectedIndicator.specificInd.length > 0 && SpecificIndTable}
        </Table>
      </Box>
    </ItemBox>
  );
};
